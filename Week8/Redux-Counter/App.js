import store from './src/store/store';
import { Provider } from 'react-redux';
import Counter from './src/component/Counter';

export default function App() {
  return (
      <Provider store={store}>
          <Counter/>
      </Provider>
  );
}
