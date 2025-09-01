
// Tipagem correta para controle global
declare global {
  interface Window {
    __form1ErrorActiveGlobal?: boolean;
  }
}

import { useEffect, useCallback } from 'react'

import { Input } from '../styles/ui/Input'
import { Select } from '../styles/ui/Select'
import { Grid } from '../styles/ui/Grid'
import { BtnPrimary } from '../styles/ui/BtnPrimary'
import { BtnTertiary } from '../styles/ui/BtnTertiary'

import { WarnLabel } from './styles.ts'

import { FormButtons } from './styles.ts'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useBank } from "../contexts/useBank";

// Função utilitária para extrair apenas dígitos
const onlyDigits = (value?: string) => (value ? value.replace(/\D/g, '') : '');

const createUserFormSchema = z.object({
  professional: z.string().nonempty('Profissional é obrigatório'),
  bank: z.string().nonempty('Banco é obrigatório'),
  account_type: z.string().nonempty('Tipo de conta é obrigatório'),
  agency: z.string().nonempty('Agência é obrigatória'),
  account: z.string().nonempty('Conta é obrigatória'),
  personType: z.string().nonempty('Tipo de pessoa é obrigatório'),
  cpf: z.string().optional(),
  phone: z.string().nonempty('Telefone é obrigatório'),
  full_name: z.string().optional().transform(name => {
    if (!name) return '';
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  company_name: z.string().optional(),
  cnpj: z.string().optional(),
  responsible_name: z.string().optional(),
  responsible_cpf: z.string().optional(),
  cep: z.string().optional(),
  state: z.string().nonempty('Estado é obrigatório'),
  city: z.string().nonempty('Cidade é obrigatória'),
  address: z.string().optional(),
  number: z.string().optional()
}).superRefine((data, ctx) => {
    // Validação para CPF (mínimo 11 dígitos)
    if (data.personType === 'fisica') {
      const cpfDigits = onlyDigits(data.cpf);
      if (!cpfDigits || cpfDigits.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cpf'],
          message: 'CPF deve conter no mínimo 11 dígitos válidos'
        });
      }
      if (!data.full_name || data.full_name.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['full_name'],
          message: 'Nome é obrigatório'
        });
      }
      if (!data.address || data.address.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address'],
          message: 'Endereço é obrigatório'
        });
      }
      if (!data.number || data.number.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['number'],
          message: 'Número é obrigatório'
        });
      }
      // Validação para CEP (8 dígitos)
      const cepDigits = onlyDigits(data.cep);
      if (!cepDigits || cepDigits.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cep'],
          message: 'CEP deve conter 8 dígitos válidos'
        });
      }
      // Validação para telefone (mínimo 11 dígitos)
      const phoneDigits = onlyDigits(data.phone);
      if (!phoneDigits || phoneDigits.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['phone'],
          message: 'Telefone deve conter no mínimo 11 dígitos válidos'
        });
      }
    }
  if (data.personType === 'juridica') {
    if (!data.company_name || data.company_name.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company_name'],
        message: 'Razão Social é obrigatória'
      });
    }
    // Validação para CNPJ (14 dígitos)
    const cnpjDigits = onlyDigits(data.cnpj);
    if (!cnpjDigits || cnpjDigits.length !== 14) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cnpj'],
        message: 'CNPJ deve conter 14 dígitos válidos'
      });
    }
    if (!data.responsible_name || data.responsible_name.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['responsible_name'],
        message: 'Nome do responsável é obrigatório'
      });
    }
    // Validação para CPF do responsável (11 dígitos)
    const responsible_cpfDigits = onlyDigits(data.responsible_cpf);
    if (!responsible_cpfDigits || responsible_cpfDigits.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['responsible_cpf'],
        message: 'CPF do responsável deve conter 11 dígitos válidos'
      });
    }
    // Validação para telefone (mínimo 11 dígitos)
    const phoneDigits = onlyDigits(data.phone);
    if (!phoneDigits || phoneDigits.length < 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: 'Telefone deve conter no mínimo 11 dígitos válidos'
      });
    }
    // Validação para CEP (8 dígitos)
    const cepDigits = onlyDigits(data.cep);
    if (!cepDigits || cepDigits.length !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cep'],
        message: 'CEP deve conter 8 dígitos válidos'
      });
    }
  }
});

export type CreateUserFormData = {
  professional: string;
  bank: string;
  account_type: string;
  agency: string;
  account: string;
  personType: string;
  cpf?: string;
  phone: string;
  full_name?: string;
  company_name?: string;
  cnpj?: string;
  responsible_name?: string;
  responsible_cpf?: string;
  cep?: string;
  state: string;
  city: string;
  address?: string;
  number?: string;
};

export default function Form1() {
  const { setShowBank, setForm1Data, setStep, setError } = useBank();
  const { 
    register, 
    handleSubmit, 
    formState : { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      professional: 'joao_silva',
      cep: '__.___-___',
      cpf: '___.___.___-__'
    }
  })

  const cep = watch('cep')
  const cpf = watch('cpf')
  const phone = watch('phone')
  const cnpj = watch('cnpj')
  const responsible_cpf = watch('responsible_cpf')

  const formatMask = useCallback((value: string, template: string) => {
    const currentNumbers = value.replace(/[^\d]/g, '')
    
    if (!currentNumbers) {
      return template
    }

    let result = template
    let valueIndex = 0

    for (let i = 0; i < template.length && valueIndex < currentNumbers.length; i++) {
      if (template[i] === '_') {
        result = result.substring(0, i) + currentNumbers[valueIndex] + result.substring(i + 1)
        valueIndex++
      }
    }

    return result
  }, [])

  const formatCEP = useCallback((value: string) => formatMask(value, '__.___-___'), [formatMask])
  const formatCPF = useCallback((value: string) => formatMask(value, '___.___.___-__'), [formatMask])
  const formatCNPJ = useCallback((value: string) => formatMask(value, '__.___.___/____-__'), [formatMask])
  const formatPhone = useCallback((value: string) => formatMask(value, '(__) _____-____'), [formatMask])

  useEffect(() => {
    const formattedCEP = formatCEP(cep || '')
    if (formattedCEP !== cep) {
      setValue('cep', formattedCEP)
    }
    // Limpa erro se o CEP for válido
    const numericCEP = (cep || '').replace(/[^\d]/g, '')
    if (numericCEP.length === 8) {
      clearErrors('cep')
    }
  }, [cep, setValue, formatCEP, clearErrors])

  useEffect(() => {
    const formattedCPF = formatCPF(cpf || '')
    if (formattedCPF !== cpf) {
      setValue('cpf', formattedCPF)
    }
    // Limpa erro se o CPF for válido
    const numericCPF = (cpf || '').replace(/[^\d]/g, '')
    if (numericCPF.length === 11) {
      clearErrors('cpf')
    }
  }, [cpf, setValue, formatCPF, clearErrors])

  useEffect(() => {
    const formattedPhone = formatPhone(phone || '')
    if (formattedPhone !== phone) {
      setValue('phone', formattedPhone)
    }
    // Limpa erro se o telefone for válido
    const numericPhone = (phone || '').replace(/[^\d]/g, '')
    if (numericPhone.length >= 11) {
      clearErrors('phone')
    }
  }, [phone, setValue, formatPhone, clearErrors])

  useEffect(() => {
    const formattedCNPJ = formatCNPJ(cnpj || '')
    if (formattedCNPJ !== cnpj) {
      setValue('cnpj', formattedCNPJ)
    }
    // Limpa erro se o CNPJ for válido
    const numericCNPJ = (cnpj || '').replace(/[^\d]/g, '')
    if (numericCNPJ.length === 14) {
      clearErrors('cnpj')
    }
  }, [cnpj, setValue, formatCNPJ, clearErrors])

  useEffect(() => {
    const formattedresponsible_cpf = formatCPF(responsible_cpf || '')
    if (formattedresponsible_cpf !== responsible_cpf) {
      setValue('responsible_cpf', formattedresponsible_cpf)
    }
    // Limpa erro se o CPF do responsável for válido
    const numericRespCPF = (responsible_cpf || '').replace(/[^\d]/g, '')
    if (numericRespCPF.length === 11) {
      clearErrors('responsible_cpf')
    }
  }, [responsible_cpf, setValue, formatCPF, clearErrors])

  useEffect(() => {
    const numericCEP = cep?.replace(/[^\d]/g, '')
    if (numericCEP?.length === 8) {
      fetch(`https://viacep.com.br/ws/${numericCEP}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            setValue('city', data.localidade)
            setValue('state', data.uf)
            setValue('address', data.logradouro)
          }
        })
    }
  }, [cep, setValue])

  function createUser(data: CreateUserFormData) {
    let filteredData: Partial<CreateUserFormData> = {};
    if (data.personType === 'fisica') {
      const {
        professional, bank, account_type, agency, account, personType, cpf, phone, full_name, cep, state, city, address, number
      } = data;
      filteredData = {
        professional, bank, account_type, agency, account, personType, cpf, phone, full_name, cep, state, city, address, number
      };
    } else if (data.personType === 'juridica') {
      const {
        professional, bank, account_type, agency, account, personType, phone, company_name, cnpj, responsible_name, responsible_cpf, cep, state, city
      } = data;
      filteredData = {
        professional, bank, account_type, agency, account, personType, phone, company_name, cnpj, responsible_name, responsible_cpf, cep, state, city
      };
    }
    setForm1Data(filteredData);
    window.location.href = '#'
    setStep(2);
  }

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

  return (
    <>
      <form onSubmit={handleSubmit(createUser, handleError)} className="form-container">

        <WarnLabel>
          <h2>Atenção!!! Verifique atentamente a cada dado preenchido no cadastro de sua conta.</h2>
          <ul>
              <li>Caso queira cadastrar uma conta de banco CNPJ, verifique se a sua conta corrente é CNPJ e preencha o CPF correto do responsável da conta.</li>
              <li>O preenchimento incorreto das informações pode trazer transtornos no momento da transferência do valor para essa conta corrente.</li>
              <li>Se possível preencha com calma para não ocorrer erros.</li>
          </ul>
        </WarnLabel> 

        <Select
          label="Profissional"
          {...register('professional')}
          is_disabled={true}
          disabled
          required={true}
          value="joao_silva"
          options={[{ value: 'joao_silva', label: 'João Silva' }]}
          error={errors.professional?.message}
        />


        <Grid cols={2} gap={'18px'}>
          <Select
            label="Banco"
            placeholder="Selecione"
            required={true}
            {...register('bank')}
            options={[
              { value: 'banco_do_brasil', label: 'Banco do Brasil' },
              { value: 'bradesco', label: 'Bradesco' },
              { value: 'caixa_economica', label: 'Caixa Econômica' },
              { value: 'itau', label: 'Itaú' },
              { value: 'inter', label: 'Inter' },
              { value: 'santander', label: 'Santander' },
            ]}
            error={errors.bank?.message}
          />


          <Select
            label="Tipo de conta"
            required={true}
            placeholder="Selecione"
            {...register('account_type')}
            options={[
              { value: 'corrente', label: 'Conta Corrente' },
              { value: 'poupanca', label: 'Poupança' },
            ]}
            error={errors.account_type?.message}
          />
        </Grid>

        <Grid cols={2} gap={'18px'}>
          <Input
            required={true}
            label="Agência"
            placeholder="Digite aqui"
            {...register('agency')}
            error={errors.agency?.message}
          />

          <Input
            required={true}
            label="Conta com dígito"
            placeholder="Digite aqui"
            {...register('account')} 
            error={errors.account?.message}
          />
        </Grid>

        <Grid cols={3} gap={'18px'}>
          <Select
            label="Tipo de pessoa"
            required={true}
            {...register('personType')}
            options={[
              { value: 'fisica', label: 'Pessoa Física' },
              { value: 'juridica', label: 'Pessoa Jurídica' },
            ]}
            error={errors.personType?.message}
          />

          {watch('personType') === 'fisica' && (
            <Input
              required={true}
              label="CPF"
              placeholder="Digite aqui"
              {...register('cpf')}
              error={errors.cpf?.message}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  e.preventDefault()
                  const currentValue = watch('cpf')
                  const numericValue = currentValue && currentValue.replace(/[^\d]/g, '')
                  if (numericValue && numericValue.length > 0) {
                    const newNumericValue = numericValue.slice(0, -1)
                    const template = '___.___.___-__'
                    let result = template
                    let valueIndex = 0
                    for (let i = 0; i < template.length && valueIndex < newNumericValue.length; i++) {
                      if (template[i] === '_') {
                        result = result.substring(0, i) + newNumericValue[valueIndex] + result.substring(i + 1)
                        valueIndex++
                      }
                    }
                    setValue('cpf', result)
                  }
                }
              }}
            />
          )}

          {watch('personType') === 'juridica' && (
            <Input
              required={true}
              label="CNPJ"
              placeholder="Digite aqui"
              {...register('cnpj')}
              error={errors.cnpj?.message}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  e.preventDefault()
                  const currentValue = watch('cnpj') || ''
                  const numericValue = currentValue.replace(/[^\d]/g, '')
                  if (numericValue.length > 0) {
                    const newNumericValue = numericValue.slice(0, -1)
                    const template = '__.___.___/____-__'
                    let result = template
                    let valueIndex = 0
                    for (let i = 0; i < template.length && valueIndex < newNumericValue.length; i++) {
                      if (template[i] === '_') {
                        result = result.substring(0, i) + newNumericValue[valueIndex] + result.substring(i + 1)
                        valueIndex++
                      }
                    }
                    setValue('cnpj', result)
                  }
                }
              }}
            />
          )}

          <Input
            required={true}
            label="Telefone"
            placeholder="Digite aqui"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                e.preventDefault()
                const currentValue = watch('phone')
                const numericValue = currentValue.replace(/[^\d]/g, '')
                if (numericValue.length > 0) {
                  const newNumericValue = numericValue.slice(0, -1)
                  const template = '(__) _____-____'
                  let result = template
                  let valueIndex = 0
                  for (let i = 0; i < template.length && valueIndex < newNumericValue.length; i++) {
                    if (template[i] === '_') {
                      result = result.substring(0, i) + newNumericValue[valueIndex] + result.substring(i + 1)
                      valueIndex++
                    }
                  }
                  setValue('phone', result)
                }
              }
            }}
          />
        </Grid>

        {watch('personType') === 'juridica' ? (
          <>
            <Input
              required={true}
              label="Razão Social"
              placeholder="Digite aqui"
              {...register('company_name')}
              error={errors.company_name?.message}
            />

            <Input
              required={true}
              label="Nome do responsável pela conta"
              placeholder="Digite aqui"
              {...register('responsible_name')}
              error={errors.responsible_name?.message}
            />

            <Input
              required={true}
              label="CPF do responsável pela conta"
              placeholder="Digite aqui"
              {...register('responsible_cpf')}
              error={errors.responsible_cpf?.message}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  e.preventDefault()
                  const currentValue = watch('responsible_cpf') || ''
                  const numericValue = currentValue.replace(/[^\d]/g, '')
                  if (numericValue.length > 0) {
                    const newNumericValue = numericValue.slice(0, -1)
                    const template = '___.___.___-__'
                    let result = template
                    let valueIndex = 0
                    for (let i = 0; i < template.length && valueIndex < newNumericValue.length; i++) {
                      if (template[i] === '_') {
                        result = result.substring(0, i) + newNumericValue[valueIndex] + result.substring(i + 1)
                        valueIndex++
                      }
                    }
                    setValue('responsible_cpf', result)
                  }
                }
              }}
            />
          </>
        ) : (
          <>
            <Input
              required={true}
              label="Nome completo"
              placeholder="Digite aqui"
              {...register('full_name')}
              error={errors.full_name?.message}
            />
          </>
        )}

      <Grid cols={3} gap={'18px'}>
        <Input
          required={true}
          label="CEP"
          placeholder="Digite aqui"
          {...register('cep')}
          error={errors.cep?.message}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault()
              const currentValue = watch('cep')
              const numericValue = currentValue && currentValue.replace(/[^\d]/g, '')
              if (numericValue && numericValue.length > 0) {
                const newNumericValue = numericValue.slice(0, -1)
                const template = '__.___-___'
                let result = template
                let valueIndex = 0
                for (let i = 0; i < template.length && valueIndex < newNumericValue.length; i++) {
                  if (template[i] === '_') {
                    result = result.substring(0, i) + newNumericValue[valueIndex] + result.substring(i + 1)
                    valueIndex++
                  }
                }
                setValue('cep', result)
              }
            }
          }}
        />

        <Select
          label="Estado"
          required={true}
          placeholder="Selecione"
          {...register('state')}
          options={[
            { value: 'AC', label: 'Acre' },
            { value: 'AL', label: 'Alagoas' },
            { value: 'AP', label: 'Amapá' },
            { value: 'AM', label: 'Amazonas' },
            { value: 'BA', label: 'Bahia' },
            { value: 'CE', label: 'Ceará' },
            { value: 'DF', label: 'Distrito Federal' },
            { value: 'ES', label: 'Espírito Santo' },
            { value: 'GO', label: 'Goiás' },
            { value: 'MA', label: 'Maranhão' },
            { value: 'MT', label: 'Mato Grosso' },
            { value: 'MS', label: 'Mato Grosso do Sul' },
            { value: 'MG', label: 'Minas Gerais' },
            { value: 'PA', label: 'Pará' },
            { value: 'PB', label: 'Paraíba' },
            { value: 'PR', label: 'Paraná' },
            { value: 'PE', label: 'Pernambuco' },
            { value: 'PI', label: 'Piauí' },
            { value: 'RJ', label: 'Rio de Janeiro' },
            { value: 'RN', label: 'Rio Grande do Norte' },
            { value: 'RS', label: 'Rio Grande do Sul' },
            { value: 'RO', label: 'Rondônia' },
            { value: 'RR', label: 'Roraima' },
            { value: 'SC', label: 'Santa Catarina' },
            { value: 'SP', label: 'São Paulo' },
            { value: 'SE', label: 'Sergipe' },
            { value: 'TO', label: 'Tocantins' },
          ]}
          error={errors.state?.message}
        />

        <Input
          required={true}
          label="Cidade"
          placeholder="Digite aqui"
          {...register('city')}
          error={errors.city?.message}
        />
      </Grid>


        {watch('personType') === 'fisica' && (
          <Grid cols={3} gap={'18px'}>
            <div style={{ gridColumn: 'span 2' }}>
              <Input
                required={true}
                label="Endereço"
                placeholder="Digite aqui"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>
            <Input
              required={true}
              label="Número"
              placeholder="Digite aqui"
              {...register('number')}
              error={errors.number?.message}
            />
          </Grid>
        )}

        <FormButtons>
          <BtnTertiary onClick={() => {setShowBank(false); setStep(1)}}>Cancelar</BtnTertiary>
          <BtnPrimary type="submit">Próximo</BtnPrimary>
        </FormButtons>

      </form>
    </>
  )
}
