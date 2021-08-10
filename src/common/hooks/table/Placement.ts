import {useAxiosQuery} from '../Api';
import PlacementService from '@src/lib/services/Placement';
import {Placement} from '@src/types';

export const usePlacementTable = useAxiosQuery<Placement[]>(
  PlacementService.getList,
);
