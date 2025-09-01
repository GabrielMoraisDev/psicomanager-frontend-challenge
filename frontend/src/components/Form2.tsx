import { Select } from '../styles/ui/Select'
import { TitleReactQuill } from './styles'
import { Grid } from '../styles/ui/Grid'
import { BtnPrimary } from '../styles/ui/BtnPrimary'
import { BtnSecondary } from '../styles/ui/BtnSecondary'
import { BtnTertiary } from '../styles/ui/BtnTertiary'
import { FormButtons, StyledGridButtonWrapper } from './styles';
import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type Quill from 'quill';
import styled from 'styled-components';
import { colors } from '../styles/colors.ts'

import ReactQuill from 'react-quill-new';

import { useBank } from "../contexts/useBank";

import 'react-quill-new/dist/quill.snow.css';
// Styled wrapper para customizar o ReactQuill
const StyledQuillWrapper = styled.div`
  border: 1px solid #E9ECEF;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0px;
  /* Remove shadow e borda da toolbar */
  .ql-toolbar {
    box-shadow: none !important;
    border: none !important;
    border-bottom: none !important;
    border-radius: 0 !important;
    background: #fff;
  }
  .ql-container {
    border: none !important;
    border-radius: 0 0 6px 6px;
  }
`;

import { InfoLabel, InfoTitle } from './styles'

type Form2Fields = {
  message: string;
};

export default function Form2() {
  const { setShowBank, setForm2Data, setStep } = useBank();
  const quillRef = useRef<ReactQuill | null>(null);
  const [dynamicMark, setDynamicMark] = useState('');

  // Zod schema
  const schema = z.object({
    message: z.string(),
  });

  const defaultQuillValue = 'Olá {{NOME_CLIENTE}}. Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões.\nObrigado!';

  const { control, handleSubmit, setValue } = useForm<Form2Fields>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: defaultQuillValue,
    },
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  // Insere marcação dinâmica no ReactQuill
  const handleInsert = () => {
    if (dynamicMark) {
      const markToInsert = `{{${dynamicMark}}}`;
      const quill: Quill | undefined = quillRef.current ? (quillRef.current.getEditor?.() as Quill) : undefined;
      if (quill) {
        const range = quill.getSelection(true);
        quill.insertText(range ? range.index : 0, markToInsert, 'user');
      } else {
        const current = (quillRef.current?.props.value ?? '');
        setValue('message', current + markToInsert);
      }
    }
  };

  // Salva como JSON ao submeter e no contexto
  const onSubmit = (data: Form2Fields) => {
    window.location.href = '#'
    setStep(3);
    setForm2Data(data); // Salva no contexto
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Profissional"
        is_disabled={true}
        disabled
        required={true}
        value="joao_silva"
        options={[{ value: 'joao_silva', label: 'João Silva' }]}
        error={''}
      />
      <InfoTitle>Enviar cobrança por Email</InfoTitle>
      <InfoLabel>
        <p>Esse é a mensagem por e-mail que seus clientes irão receber. Clique no campo de texto para editar o conteúdo da mensagem e depois siga para o próximo passo.</p>
      </InfoLabel>

              <Grid cols={4} gap={'1px'}>
                <div style={{ gridColumn: 'span 3' }}>
                  <Select
                    label="Marcação dinâmica"
                    required={false}
                    style={{borderColor: colors.neutral30}}
                    placeholder="--Selecione--"
                    options={[
                      { value: 'NOME_CLIENTE', label: 'Nome do Cliente' },
                      { value: 'CPF_CLIENTE', label: 'CPF do Cliente' },
                      { value: 'TELEFONE_CLIENTE', label: 'Telefone do Cliente' }
                    ]}
                    value={dynamicMark}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement> | string) => {
                      if (typeof e === 'string') {
                        setDynamicMark(e);
                      } else {
                        setDynamicMark(e.target.value);
                      }
                    }}
                    error={''}
                  />
                </div>
                <StyledGridButtonWrapper>
                  <BtnSecondary
                    type="button"
                    onClick={() => {
                      if (dynamicMark) handleInsert();
                    }}
                    disabled={!dynamicMark}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: !dynamicMark ? '0.2' : '1' }}>
                      <path d="M16 8.77783C16 9.45822 15.4488 10.009 14.7692 10.009H9.23077V15.5474C9.23077 16.2278 8.67962 16.7778 8 16.7778C7.32038 16.7778 6.76923 16.2278 6.76923 15.5474V10.009H1.23077C0.551154 10.009 0 9.45822 0 8.77783C0 8.09745 0.551154 7.54745 1.23077 7.54745H6.76923V2.00899C6.76923 1.3286 7.32038 0.777832 8 0.777832C8.67962 0.777832 9.23077 1.3286 9.23077 2.00899V7.54745H14.7692C15.45 7.54706 16 8.09706 16 8.77783Z" fill="#334094"/>
                    </svg>
                    Inserir
                  </BtnSecondary>
                </StyledGridButtonWrapper>

              </Grid>

              <TitleReactQuill>Conteúdo da mensagem:</TitleReactQuill>
              <StyledQuillWrapper>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={modules}
                    />
                  )}
                />
              </StyledQuillWrapper>

              <FormButtons>
                <BtnTertiary onClick={() => {setShowBank(false); setStep(1)}}>Cancelar</BtnTertiary>
                <BtnPrimary type="submit">Próximo</BtnPrimary>
              </FormButtons>
            </form>
          );
        }