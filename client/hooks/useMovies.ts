import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getMoviesByMood, addMovie } from '../api/movies.ts'

export function useMoviesByMood(mood: string) {
  const result = useQuery({
    queryKey: ['mood', mood],
    queryFn: () => getMoviesByMood(mood),
    enabled: !!mood,
  })
  return result
}

export function useSomethingMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mood'] })
    },
  })

  return mutation
}

export function useAddMovie() {
  return useSomethingMutation(addMovie)
}
