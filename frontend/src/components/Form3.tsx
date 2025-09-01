import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '../styles/ui/Select';
import { FinePercentInput } from '../styles/ui/FinePercentInput';
import { BtnPrimary } from '../styles/ui/BtnPrimary';
import { BtnTertiary } from '../styles/ui/BtnTertiary';
import { FormButtons } from './styles.ts';
import { useBank } from '../contexts/useBank';
import 'react-quill-new/dist/quill.snow.css';
import { InfoLabel, InfoTitle } from './styles';
import { colors } from '../styles/colors.ts';


const formSchema = z.object({
  payment_methods: z.array(z.string()).min(1, 'Selecione pelo menos um meio de pagamento'),
  fine: z.boolean(),
  fineValue: z.string().optional(),
  interest: z.boolean(),
}).refine(
  (data) => {
    if (data.fine) {
      return !!data.fineValue && data.fineValue.trim() !== '';
    }
    return true;
  },
  {
    message: 'Informe o valor da multa',
    path: ['fineValue'],
  }
);


type FormData = z.infer<typeof formSchema>;

export default function Form3() {
  const { setShowBank, setError, setSuccess, setStep, setForm3Data, Form1Data, Form2Data } = useBank();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment_methods: [],
      fine: false,
      fineValue: undefined,
      interest: false,
    },
  });

  const onSubmit = (data: FormData) => {
    // Transforma os dados para o formato desejado
    const paymentMethodsMap: Record<string, string> = {
      pix: 'Pix',
      cartao_credito: 'Cartão de Crédito',
      boleto: 'Boleto Bancário',
    };
    const meiosDePagamento = data.payment_methods.map((m) => paymentMethodsMap[m] || m);
    const objeto = {
      meios_de_pagamento: meiosDePagamento,
      multa: data.fine,
      valor_multa: data.fineValue !== undefined ? String(data.fineValue).replace('.', ',') : '',
      juros: data.interest
    };

    setForm3Data(objeto);

    const dadosUnificados = {
      ...Form1Data,
      ...Form2Data,
      ...objeto
    };

    console.table(Form1Data);
    console.table(Form2Data);
    console.table(objeto);

    console.log('Dados unificados:');
    console.log(dadosUnificados);

    setStep(4);
    setShowBank(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

 if (typeof window.__form1ErrorActiveGlobal !== 'boolean') {
    window.__form1ErrorActiveGlobal = false;
  }

  const handleError = () => {
    if (!window.__form1ErrorActiveGlobal) {
      setError(true);
      window.__form1ErrorActiveGlobal = true;
      setTimeout(() => {
        setError(false);
        window.__form1ErrorActiveGlobal = false;
      }, 3000);
    }
  };
  const watchFine = watch('fine');

  // Limpa o valor do input de multa ao desmarcar o checkbox
  React.useEffect(() => {
    if (!watchFine) {
      setValue('fineValue', undefined);
    }
  }, [watchFine, setValue]);

  return (
  <form onSubmit={handleSubmit(onSubmit, handleError)}>
      <Select
        label="Profissional"
        is_disabled={true}
        disabled
        required={true}
        value="joao_silva"
        options={[{ value: 'joao_silva', label: 'João Silva' }]}
        error={''}
      />
      <InfoTitle>Forma de pagamento da cobrança</InfoTitle>
      <InfoLabel>
        <p>Escolha quais as opções de pagamento que estarão disponíveis para o seu cliente no link das mensagens de cobrança;</p>
      </InfoLabel>

      <h4>Disponibilizar meios de pagamento: <label style={{ color: colors.errorMedium }}>*</label></h4>

      <p>
        <input type="checkbox" id="pix" value="pix" {...register('payment_methods')} />
        <label htmlFor="pix" style={{ marginLeft: '11px' }}>Pix</label>
      </p>
      <p>
        <input type="checkbox" id="cartao_credito" value="cartao_credito" {...register('payment_methods')} />
        <label htmlFor="cartao_credito" style={{ marginLeft: '11px' }}>Cartão de crédito</label>
      </p>
      <p>
        <input type="checkbox" id="boleto" value="boleto" {...register('payment_methods')} />
        <label htmlFor="boleto" style={{ marginLeft: '11px' }}>Boleto Bancário</label>
      </p>

      <hr style={{ backgroundColor: colors.neutral30, height: '1px', border: 'none' }} />

      <h4>Definir multas e juros para todos os boletos após o vencimento:</h4>

      <p>
        <input type="checkbox" id="multa" {...register('fine')} />
        <label htmlFor="multa" style={{ marginLeft: '11px' }}>Cobrar multa</label>
      </p>
      {watchFine && (
        <div style={{ margin: '8px 0 16px 0' }}>
          <FinePercentInput
            label="Valor da multa em %"
            required={true}
            placeholder="0,0"
            style={{ width: '170px' }}
            error={errors.fineValue?.message}
            {...register('fineValue')}
          />
        </div>
      )}
      <p>
        <input type="checkbox" id="juros" {...register('interest')} />
        <label htmlFor="juros" style={{ marginLeft: '11px' }}>Cobrar juros por dia de atraso (valor 1% ao mês)</label>
      </p>

      <FormButtons>
        <BtnTertiary onClick={() => {setShowBank(false); setStep(1)}}>Cancelar</BtnTertiary>
        <BtnPrimary type="submit">Concluir</BtnPrimary>
      </FormButtons>
    </form>
  );
}