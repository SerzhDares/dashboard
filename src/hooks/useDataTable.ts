import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { dataState, fetchData } from "../store/slices/getDataSlice";

interface Filters {
  name?: string;
  minAge?: string;
  maxAge?: string;
}

interface SortDescriptor {
  column: string;
  direction: 'ascending' | 'descending';
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const useDataTable = () => {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const { usersData } = useAppSelector(dataState);
  const fetchTableData = async (
    page: number,
    rowsPerPage: number,
    filters: Filters,
    sortDescriptor: SortDescriptor
  ): Promise<{ items: Person[]; totalPages: number }> => {

    // filtering
    let filteredData = usersData.filter(person => {
      if (filters.name && !`${person.firstName} ${person.lastName}`.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.minAge && person.age < parseInt(filters.minAge)) return false;
      if (filters.maxAge && person.age > parseInt(filters.maxAge)) return false;
      return true;
    });

    // sorting
    if (sortDescriptor.column) {
      filteredData.sort((a, b) => {
        const aValue = a[sortDescriptor.column as keyof Person];
        const bValue = b[sortDescriptor.column as keyof Person];
        if (aValue < bValue) return sortDescriptor.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortDescriptor.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    // pagination
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    return {
      items: paginatedData,
      totalPages: Math.ceil(filteredData.length / rowsPerPage),
    };
  };

  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: '', direction: 'ascending'});
  const [filters, setFilters] = useState<Filters>({});
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { items: newItems, totalPages: newTotalPages } = await fetchTableData(page, rowsPerPage, filters, sortDescriptor);
      setItems(newItems);
      setTotalPages(newTotalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filters, sortDescriptor, usersData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    items,
    loading,
    page,
    setPage,
    totalPages,
    sortDescriptor,
    setSortDescriptor,
    filters,
    setFilters,
    rowsPerPage,
    setRowsPerPage,
  };
};