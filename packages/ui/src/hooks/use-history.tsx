import { useContext } from 'react';
import { HValidation, HistoryContext } from '../providers/history.provider';

export function useHistory(): HValidation {
  const context = useContext(HistoryContext);
  return context;
}
