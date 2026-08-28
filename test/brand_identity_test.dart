import 'package:flutter_test/flutter_test.dart';

import 'package:faras_quran_ai/core/constants/app_constants.dart';

void main() {
  test('the academy brand uses the approved name', () {
    expect(AppConstants.academyName, 'Yahia Quran Academy');
  });
}
