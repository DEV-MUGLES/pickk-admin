import {useState, useContext, createContext} from 'react';
import {BoardFilterRowProps} from '@src/components/molecules/BoardFilter/BodyRow';
import {BoardProps} from '@src/components/templates/Board';

const BoardFilterContext = createContext({
  state: {form: {}},
  action: {
    setForm: null,
    initForm: null,
    setProperty: null,
  },
});

const getInitialFormState = (inputs: BoardFilterRowProps[]) => {
  const initialFormState = {};
  inputs.map(item => {
    initialFormState[item.name] = item.defaultValue;
  });
  return initialFormState;
};

export const useBoardFilterContext = () => useContext(BoardFilterContext);

export const withBoardFilterContext = (
  WrappedComponent: React.FunctionComponent<BoardProps>,
) => (props: BoardProps) => {
  const initialFormState = getInitialFormState(props.inputs);
  const [form, setForm] = useState(initialFormState);

  const initForm = () => {
    setForm(initialFormState);
  };

  // tslint:disable-next-line: no-any
  const setProperty = (name: string, value: any) => {
    setForm({...form, [name]: value});
  };

  const boardFilterStore = {
    state: {form},
    action: {
      setForm,
      initForm,
      setProperty,
    },
  };

  return (
    <BoardFilterContext.Provider value={boardFilterStore}>
      <WrappedComponent {...props} />
    </BoardFilterContext.Provider>
  );
};
