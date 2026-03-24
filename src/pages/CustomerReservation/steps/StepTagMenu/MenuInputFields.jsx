import { useMenuInputFields } from '@/query/shopManage/menuQueries';
import CountStepper from './CountStepper';
import { TextArea } from '@/pages/CustomerReservation/steps/steps.styles';
import * as S from './MenuInputFields.styles';

export default function MenuInputFields({ shopId, menuId, values, onChange }) {
  const { data: fields = [] } = useMenuInputFields(shopId, menuId);

  const numberField = fields.find((f) => f.inputType === 'NUMBER' && f.isActive);
  const textField = fields.find((f) => f.inputType === 'TEXT' && f.isActive);

  if (!numberField && !textField) return null;

  return (
    <S.InputFieldsWrapper>
      {numberField && (
        <S.InputFieldRow>
          <S.InputFieldLabel>
            {numberField.label}
            {numberField.required && <S.RequiredMark>*</S.RequiredMark>}
          </S.InputFieldLabel>
          <CountStepper
            count={values[numberField.id] ?? numberField.minValue ?? 1}
            onChange={(val) => onChange(numberField.id, val)}
            min={numberField.minValue ?? 1}
            max={numberField.maxValue ?? 10}
            step={numberField.stepValue ?? 1}
          />
        </S.InputFieldRow>
      )}
      {textField && (
        <S.InputFieldRow>
          <S.InputFieldLabel>
            {textField.label}
            {textField.required && <S.RequiredMark>*</S.RequiredMark>}
          </S.InputFieldLabel>
          <TextArea
            placeholder={textField.placeholder ?? ''}
            value={values[textField.id] ?? ''}
            maxLength={textField.maxLength ?? undefined}
            onChange={(e) => onChange(textField.id, e.target.value)}
          />
        </S.InputFieldRow>
      )}
    </S.InputFieldsWrapper>
  );
}
