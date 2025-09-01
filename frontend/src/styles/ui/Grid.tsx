import React from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

interface GridProps {
  children: ReactNode;
  cols?: number;
  gap?: string;
  style?: React.CSSProperties;
  className?: string;
}

const StyledGrid = styled.div<{
  $cols: number;
  $gap: string;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, 1fr);
  gap: ${props => props.$gap};
  & > * {
    min-width: 0;
  }

  @media (max-width: 768px) {
    gap: 0px;
    grid-template-columns: 1fr !important;
  }
`;

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 2,
  gap = '1rem',
  style,
  className,
}) => {
  return (
    <StyledGrid $cols={cols} $gap={gap} style={style} className={className}>
      {children}
    </StyledGrid>
  );
};
