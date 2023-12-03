import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';

const FormInput = ({
  label = '',
  name,
  placeholder,
  autoComplete,
  type,
  required,
  id,
  min,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  autoComplete: string;
  type: string;
  required: boolean;
  min?: number;
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Label className="sr-only" htmlFor={id}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Label>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete={autoComplete}
        autoCorrect="off"
        required={required}
        disabled={pending}
        min={min}
      />
    </>
  );
};

export default FormInput;
