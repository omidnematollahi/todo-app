import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const SUSPENSE_STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
};

interface useRequestQueryInputs {
  queryKey: [string];
  queryFn: Function;
  enabled: boolean;
  queryOptions: {
    retry?: boolean;
    refetchOnMount?: boolean;
    refetchOnReconnect?: boolean;
    refetchOnWindowFocus?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  };
}

export const useRequestQuery = ({
  queryKey,
  queryFn,
  enabled = true,
  queryOptions,
}: useRequestQueryInputs) => {
  const [queryData, setQueryData] = useState(null);

  const {
    retry = false,
    refetchOnMount = false,
    refetchOnReconnect = false,
    refetchOnWindowFocus = false,
  } = queryOptions;

  const queryClient = useQueryClient();
  const queryFunction = async () => {
    try {
      const data = await queryFn();
      queryClient.setQueryData(queryKey, () => data);
      queryOptions.onSuccess && queryOptions.onSuccess(data);
      setQueryData(data);
      return queryData;
    } catch (error) {
      queryOptions.onError && queryOptions.onError(error);
      return error;
    }
  };

  const query = useQuery({
    queryKey,
    queryFn: queryFunction,
    enabled,
    staleTime: 0,
    retry,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    ...queryOptions,
  });

  const { isError, isSuccess } = query;

  const suspenseState = useMemo(() => {
    if (isSuccess) return SUSPENSE_STATES.SUCCESS;
    if (isError) return SUSPENSE_STATES.ERROR;
    return SUSPENSE_STATES.LOADING;
  }, [isSuccess, isError]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  return {
    ...query,
    suspenseState,
    invalidate,
  };
};

export default useRequestQuery;
