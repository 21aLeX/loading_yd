import { useContext } from 'react';

import spinerContext from '../contexts/SpinerContext.jsx';

const useSpiner = () => useContext(spinerContext);

export default useSpiner;
