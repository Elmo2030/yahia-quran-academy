import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, ClipboardCheck, FileJson2, Home, LockKeyhole, LogOut, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

type EntryForm = {
  speakerPass: "teacher" | "children" | "unknown";
  ayahNumber: string;
  wordStart: string;
  wordEnd: string;
  startMs: string;
  endMs: string;
  canonicalText: string;
  reviewerNote: string;
  reviewStatus: "unreviewed" | "needs_review" | "rejected" | "approved";
};

function ReviewContent() {
  const { loading, user } = useAuth();
  const utils = trpc.useUtils();
  const [draftId, setDraftId] = useState<number | null>(null);
  const [importJson, setImportJson] = useState("");
  const [importParseError, setImportParseError] = useState<string | null>(null);
  const isAdmin = user?.role === "admin";
  const drafts = trpc.timingReview.list.useQuery(undefined, { enabled: isAdmin });
  const activeDraftId = draftId ?? drafts.data?.[0]?.id ?? null;
  const detail = trpc.timingReview.get.useQuery({ draftId: activeDraftId ?? 0 }, { enabled: isAdmin && activeDraftId !== null });
  const bootstrap = trpc.timingReview.bootstrapFatiha.useMutation({
    onSuccess: data => {
      if (!data) return;
      setDraftId(data.draft.id);
      void utils.timingReview.list.invalidate();
      void utils.timingReview.get.invalidate();
    },
  });
  const update = trpc.timingReview.updateEntry.useMutation({ onSuccess: () => void utils.timingReview.get.invalidate() });
  const approve = trpc.timingReview.approveDraft.useMutation({ onSuccess: () => void utils.timingReview.get.invalidate() });
  const importDraft = trpc.timingReview.importDraft.useMutation({
    onSuccess: data => {
      if (!data) return;
      setDraftId(data.draft.id);
      setImportJson("");
      setImportParseError(null);
      void utils.timingReview.list.invalidate();
      void utils.timingReview.get.invalidate();
    },
  });

  const submitImport = () => {
    try {
      setImportParseError(null);
      importDraft.mutate(JSON.parse(importJson));
    } catch {
      setImportParseError("تعذر قراءة JSON. تأكد من اكتمال الأقواس وعلامات الاقتباس قبل الاستيراد.");
    }
  };

  const draftStatus = useMemo(() => detail.data?.draft.reviewStatus ?? "unreviewed", [detail.data?.draft.reviewStatus]);
  const importErrorMessage = importParseError ?? importDraft.error?.message;

  if (loading) return <div className="review-state">جارٍ التحقق من صلاحية المراجعة…</div>;
  if (!user) return <AccessNotice icon={<LockKeyhole />} title="مساحة داخلية محمية" body="مسودات التوقيتات لا تظهر للعامة. سجّل الدخول بحساب المالك للوصول إلى أدوات المراجعة." action="تسجيل الدخول" onAction={startLogin} />;
  if (!isAdmin) return <AccessNotice icon={<ShieldAlert />} title="غير مصرح لك بالمراجعة" body="هذه المساحة متاحة لحساب الإدارة فقط، ولا تؤثر على القارئ العام." />;

  return (
    <section className="timing-review" dir="rtl">
      <header className="review-header">
        <div>
          <p className="review-eyebrow"><LockKeyhole size={15} /> مراجعة داخلية فقط</p>
          <h1>توقيتات التلاوة — مسودات قيد المراجعة</h1>
          <p>لا يقرأ القارئ العام هذه المسودات، ولا تتحول إلى مزامنة مرئية إلا بعد اعتماد كل مقطع صراحة.</p>
        </div>
        <div className={`review-status review-status--${draftStatus}`}><ClipboardCheck size={17} /> {draftStatus === "approved" ? "معتمدة" : "غير معتمدة"}</div>
      </header>

      <section className="review-import" aria-labelledby="review-import-title">
        <div><p className="review-eyebrow"><FileJson2 size={15} /> استيراد مراجعة مهنية</p><h2 id="review-import-title">إدخال مسودة JSON مرتبطة بملف R2</h2><p>تُقبل الفاتحة فقط في هذه المرحلة. يجب أن يحمل الملف `timing-review-v1` وأن يطابق مسار وتجزئة ملف R2. كل سجل يبدأ بحالة «يحتاج مراجعة».</p></div>
        <Textarea dir="ltr" className="review-import__textarea" value={importJson} onChange={event => setImportJson(event.target.value)} placeholder={'{\n  "schemaVersion": "timing-review-v1",\n  "surahNumber": 1,\n  "audio": { "path": "surahs/001.m4a", "sha256": "…" },\n  "entries": []\n}'} />
        <div className="review-import__actions"><Button variant="outline" onClick={submitImport} disabled={!importJson.trim() || importDraft.isPending}>{importDraft.isPending ? "جارٍ التحقق والاستيراد…" : "تحقق واستورد مسودة للمراجعة"}</Button><span>لن تُفعّل المزامنة بمجرد الاستيراد.</span></div>
        {importErrorMessage ? <p className="review-error">{importErrorMessage}</p> : null}
      </section>

      {!drafts.data?.length ? (
        <div className="review-empty">
          <h2>لا توجد مسودة مراجعة بعد</h2>
          <p>ستُنشأ مسودة الفاتحة من ملف R2 ذي صوت الأطفال. تبقى كل مقاطعها بحالة «غير معتمدة».</p>
          <Button onClick={() => bootstrap.mutate()} disabled={bootstrap.isPending}>{bootstrap.isPending ? "جارٍ إنشاء المسودة…" : "إنشاء مسودة الفاتحة"}</Button>
        </div>
      ) : null}

      {drafts.data?.length ? (
        <div className="review-draft-picker" aria-label="اختيار مسودة للمراجعة">
          {drafts.data.map(draft => <Button key={draft.id} variant={activeDraftId === draft.id ? "default" : "outline"} onClick={() => setDraftId(draft.id)}>{draft.label}</Button>)}
        </div>
      ) : null}

      {detail.data ? (
        <>
          <div className="review-audio-card">
            <div><strong>{detail.data.draft.label}</strong><span>R2: {detail.data.draft.audioPath}</span><small>SHA-256: {detail.data.draft.audioSha256}</small></div>
            <audio controls src="https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/surahs/001.m4a" />
          </div>
          <div className="review-warning"><ShieldAlert size={18} /><p><strong>حدود آمنة:</strong> هذه بيانات مولّدة مرشحة فقط. لا تعتمد مقطعًا إلا بعد سماعه وتحديد مرور الشيخ أو الأطفال والنص القرآني الصحيح.</p></div>
          <div className="review-entry-list">
            {detail.data.entries.map(entry => <ReviewEntry key={entry.id} entry={entry} onSave={form => update.mutate({ entryId: entry.id, ...form })} saving={update.isPending} />)}
          </div>
          <div className="review-approval">
            <div><h2>اعتماد المسودة</h2><p>لا يتاح إلا عندما تكون كل المقاطع معتمدة، مع متحدث وآية ونص قرآني محددين.</p></div>
            <Button onClick={() => { const currentDraft = detail.data?.draft; if (currentDraft) approve.mutate({ draftId: currentDraft.id }); }} disabled={approve.isPending || detail.data.draft.reviewStatus === "approved"}><CheckCircle2 size={18} /> اعتماد بعد اكتمال المراجعة</Button>
          </div>
          {approve.error ? <p className="review-error">{approve.error.message}</p> : null}
        </>
      ) : null}
    </section>
  );
}

function ReviewEntry({ entry, onSave, saving }: { entry: { speakerPass: "teacher" | "children" | "unknown"; ayahNumber: number | null; wordStart: number | null; wordEnd: number | null; startMs: number; endMs: number; canonicalText: string | null; reviewerNote: string | null; reviewStatus: "unreviewed" | "needs_review" | "rejected" | "approved"; candidateText: string | null; confidenceBps: number | null }; onSave: (form: { speakerPass: "teacher" | "children" | "unknown"; ayahNumber: number | null; wordStart: number | null; wordEnd: number | null; startMs: number; endMs: number; canonicalText: string | null; reviewerNote: string | null; reviewStatus: "unreviewed" | "needs_review" | "rejected" | "approved" }) => void; saving: boolean }) {
  const [form, setForm] = useState<EntryForm>({ speakerPass: entry.speakerPass, ayahNumber: entry.ayahNumber?.toString() ?? "", wordStart: entry.wordStart?.toString() ?? "", wordEnd: entry.wordEnd?.toString() ?? "", startMs: entry.startMs.toString(), endMs: entry.endMs.toString(), canonicalText: entry.canonicalText ?? "", reviewerNote: entry.reviewerNote ?? "", reviewStatus: entry.reviewStatus });
  const change = (key: keyof EntryForm, value: string) => setForm(current => ({ ...current, [key]: value }));
  const parseOptional = (value: string) => value.trim() === "" ? null : Number(value);
  return <article className="review-entry">
    <div className="review-entry__lead"><span className="review-time">{entry.startMs}–{entry.endMs} ms</span><strong>{entry.candidateText || "نص مرشح فارغ"}</strong><small>ثقة آلية: {entry.confidenceBps ? `${(entry.confidenceBps / 100).toFixed(2)}%` : "غير متاحة"}</small></div>
    <div className="review-grid">
      <Field label="المتحدث"><Select value={form.speakerPass} onValueChange={value => change("speakerPass", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unknown">غير محدد</SelectItem><SelectItem value="teacher">الشيخ</SelectItem><SelectItem value="children">الأطفال</SelectItem></SelectContent></Select></Field>
      <Field label="حالة المراجعة"><Select value={form.reviewStatus} onValueChange={value => change("reviewStatus", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unreviewed">غير مراجع</SelectItem><SelectItem value="needs_review">يحتاج مراجعة</SelectItem><SelectItem value="rejected">مرفوض</SelectItem><SelectItem value="approved">معتمد</SelectItem></SelectContent></Select></Field>
      <Field label="رقم الآية"><Input inputMode="numeric" value={form.ayahNumber} onChange={event => change("ayahNumber", event.target.value)} /></Field>
      <Field label="بداية الكلمة"><Input inputMode="numeric" value={form.wordStart} onChange={event => change("wordStart", event.target.value)} /></Field>
      <Field label="نهاية الكلمة"><Input inputMode="numeric" value={form.wordEnd} onChange={event => change("wordEnd", event.target.value)} /></Field>
      <Field label="البداية (ms)"><Input inputMode="numeric" value={form.startMs} onChange={event => change("startMs", event.target.value)} /></Field>
      <Field label="النهاية (ms)"><Input inputMode="numeric" value={form.endMs} onChange={event => change("endMs", event.target.value)} /></Field>
    </div>
    <Field label="النص العثماني الذي راجعته"><Input dir="rtl" value={form.canonicalText} onChange={event => change("canonicalText", event.target.value)} /></Field>
    <Field label="ملاحظة المراجع"><Textarea value={form.reviewerNote} onChange={event => change("reviewerNote", event.target.value)} /></Field>
    <Button variant="outline" onClick={() => onSave({ ...form, ayahNumber: parseOptional(form.ayahNumber), wordStart: parseOptional(form.wordStart), wordEnd: parseOptional(form.wordEnd), startMs: Number(form.startMs), endMs: Number(form.endMs), canonicalText: form.canonicalText.trim() || null, reviewerNote: form.reviewerNote.trim() || null })} disabled={saving}>حفظ مراجعة هذا المقطع</Button>
  </article>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="review-field"><Label>{label}</Label>{children}</label>; }
function AccessNotice({ icon, title, body, action, onAction }: { icon: React.ReactNode; title: string; body: string; action?: string; onAction?: () => void }) { return <div className="review-state"><div className="review-state__icon">{icon}</div><h1>{title}</h1><p>{body}</p>{action && onAction ? <Button onClick={onAction}>{action}</Button> : null}</div>; }

function TimingReviewShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return <div className="review-shell"><header className="review-adminbar"><a href="/" className="review-adminbar__brand"><ClipboardCheck size={18} /><span>Yahia Quran Academy</span><small>مراجعة داخلية</small></a><div className="review-adminbar__actions"><a href="/" className="review-adminbar__link"><Home size={16} /> العودة للموقع</a>{user ? <button type="button" onClick={logout} className="review-adminbar__link"><LogOut size={16} /> خروج</button> : null}</div></header><ReviewContent /></div>;
}

export default function TimingReview() { return <TimingReviewShell><ReviewContent /></TimingReviewShell>; }
