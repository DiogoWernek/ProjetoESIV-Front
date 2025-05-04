import { BuildingOffice, CalendarBlank, Envelope, Phone } from '@phosphor-icons/react';
import * as S from './styles'

type CardClienteProps = {
  name: string;
  active?: boolean;
  cnpj: string;
  email: string;
  phone: string;
  updated_at: string;
  onClick?: () => void;
}

export function CardCliente({ name, active, cnpj, email, phone, updated_at, onClick }: CardClienteProps) {
  return (
    <S.Container active={active} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{name}</h2>
        </div>
        <span>{active === true ? "Ativo" : "Inativo"}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <BuildingOffice size={16} color="#797981" />
        <p>{cnpj}</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Envelope size={16} color="#797981" />
        <p>{email}</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Phone size={16} color="#797981" />
        <p>{phone}</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <CalendarBlank size={16} color="#797981" />
        <p>{updated_at}</p>
      </div>
    </S.Container>
  )
}