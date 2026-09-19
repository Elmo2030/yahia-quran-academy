import {
  AlignCenter, Anchor, Apple, Archive, ArrowDownToLine, AudioLines, Baby,
  Ban, BellRing, Bird, BookCopy, BookOpen, Bug, Building2, CalendarClock,
  Carrot, Clock, CloudSun, Compass, Crown, DoorOpen, Droplet, Droplets,
  EyeOff, Feather, Flame, Footprints, Gem, Gift, GraduationCap, Handshake,
  Hash, Heart, HeartPulse, Home, Hourglass, Landmark, Languages, Layers,
  LayoutGrid, Library, Lightbulb, ListChecks, Lock, MapPin, Maximize2,
  Megaphone, MessageCircle, MessageSquareQuote, Microscope, Milestone, Moon,
  Mountain, Palette, PawPrint, PenLine, PieChart, Puzzle, RefreshCw, Repeat,
  Repeat2, Ruler, Scale, ScrollText, Search, Shield, ShieldCheck, ShieldPlus,
  Shirt, Sparkle, Sparkles, Sprout, Star, Sun, Sunrise, Tag, Telescope,
  Timer, Trees, Type, UserRoundCheck, Users, Waves, Wind,
} from "lucide-react";

const icons = {
  AlignCenter, Anchor, Apple, Archive, ArrowDownToLine, AudioLines, Baby,
  Ban, BellRing, Bird, BookCopy, BookOpen, Bug, Building2, CalendarClock,
  Carrot, Clock, CloudSun, Compass, Crown, DoorOpen, Droplet, Droplets,
  EyeOff, Feather, Flame, Footprints, Gem, Gift, GraduationCap, Handshake,
  Hash, Heart, HeartPulse, Home, Hourglass, Landmark, Languages, Layers,
  LayoutGrid, Library, Lightbulb, ListChecks, Lock, MapPin, Maximize2,
  Megaphone, MessageCircle, MessageSquareQuote, Microscope, Milestone, Moon,
  Mountain, Palette, PawPrint, PenLine, PieChart, Puzzle, RefreshCw, Repeat,
  Repeat2, Ruler, Scale, ScrollText, Search, Shield, ShieldCheck, ShieldPlus,
  Shirt, Sparkle, Sparkles, Sprout, Star, Sun, Sunrise, Tag, Telescope,
  Timer, Trees, Type, UserRoundCheck, Users, Waves, Wind,
};

export function QuranFactIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon size={size} aria-hidden="true" />;
}
