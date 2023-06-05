import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAppState } from '../redux/features/stateSlice';

interface PageWrapperProps {
  states: string;
  children: any
}

const PageWrapper = ({states, children}: PageWrapperProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    useEffect(()=> {
        window.scrollTo(0,0);

        dispatch(setAppState(states))
    }, [states, dispatch]);



  return (
    children
  )
}

export default PageWrapper