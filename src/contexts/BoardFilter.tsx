import {useState, useContext, createContext} from 'react';

import {getBoardModelByName} from '@src/models/board';
import {BoardProps} from '@src/components/templates/Board';
import {BoardFilterRowProps} from '@src/components/molecules/BoardFilter/BodyRow';

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
    Object.keys(item.defaultValue).map(defaultValueKey => {
      initialFormState[`${item.name}_${defaultValueKey}`] =
        item.defaultValue[defaultValueKey];
    });
  });
  return initialFormState;
};

export const useBoardFilterContext = () => useContext(BoardFilterContext);

export const withBoardFilterContext = (
  WrappedComponent: React.FunctionComponent<BoardProps>,
) => (props: BoardProps) => {
  if (!props.filter) {
    return <WrappedComponent {...props} />;
  }

  const boardModel = getBoardModelByName(props.name);
  const {inputs} = boardModel;

  const initialFormState = getInitialFormState(inputs);
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
