import { useMenuInputFields } from '@/query/shopManage/menuQueries';
import CountStepper from './CountStepper';
import { TextArea } from '@/pages/CustomerReservation/steps/steps.styles';
import * as S from './MenuInputFields.styles';

export default function MenuInputFields({ shopId, menuId, values, onChange }) {
  const { data: fields = [] } = useMenuInputFields(shopId, menuId);

  const activeFields = fields.filter((f) => f.isActive);

  if (activeFields.length === 0) return null;

  return (
    <S.InputFieldsWrapper>
      {activeFields.map((field) => (
        <S.InputFieldRow key={field.id}>
          <S.InputFieldLabel>
            {field.label}
            {field.required && <S.RequiredMark>*</S.RequiredMark>}
          </S.InputFieldLabel>
          {field.inputType === 'NUMBER' ? (
            <CountStepper
              count={values[field.id] ?? field.minValue ?? 1}
              onChange={(val) => onChange(field.id, val)}
              min={field.minValue ?? 1}
              max={field.maxValue ?? 10}
              step={field.stepValue ?? 1}
            />
          ) : (
            <TextArea
              placeholder={field.placeholder ?? ''}
              value={values[field.id] ?? ''}
              maxLength={field.maxLength ?? undefined}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          )}
        </S.InputFieldRow>
      ))}
    </S.InputFieldsWrapper>
  );
}
