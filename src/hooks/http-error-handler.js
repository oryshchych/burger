import {useState, useEffect } from 'react';

export default httoClient => {
    const [error, setError] = useState(null);
    const reqInterceptor = httoClient.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const resInterceptor = httoClient.interceptors.response.use(res => res, (error) => {
      setError(error);
    });
    useEffect(() => {
      return () => {
        httoClient.interceptors.request.eject(reqInterceptor);
        httoClient.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    
    
    const errorComfirmedHandler = () => {
      setError(null);
    };

    return [error, errorComfirmedHandler];
}