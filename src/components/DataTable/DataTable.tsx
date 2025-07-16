import { useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@heroui/table';
import { Pagination } from '@heroui/pagination';
import { Spinner } from '@heroui/spinner';
import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';
import { Icon } from '@iconify/react';
import { useDataTable } from '../../hooks/useDataTable';
import { dataState } from '../../store/slices/getDataSlice';
import { useAppSelector } from '../../hooks';
import './dataTable.css'

interface Column {
  name: string;
  uid: string;
  sortable: boolean;
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const DataTable: React.FC = () => {

  const { usersData } = useAppSelector(dataState);

  const {
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
  } = useDataTable();

  const renderCell = useCallback((item: Person, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Person];
    return cellValue;
  }, []);

  const columns: Column[] = [
    { name: "NAME", uid: "firstName", sortable: true },
    { name: "SURNAME", uid: "lastName", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
  ];

  return (
    <div className="space-y-4 table_block">
      <h3 className="table-title">Users table</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search by name or surname"
            value={filters.name || ""}
            onValueChange={(value) => setFilters({ ...filters, name: value })}
            startContent={<Icon icon="lucide:search" />}
          />
          <Input
            type="number"
            placeholder="Age from"
            value={filters.minAge || ""}
            onValueChange={(value) => setFilters({ ...filters, minAge: value })}
          />
          <Input
            type="number"
            placeholder="Age to"
            value={filters.maxAge || ""}
            onValueChange={(value) => setFilters({ ...filters, maxAge: value })}
          />
        </div>
      </div>
      <div className="table_params_block">
        <span className="total_users">Total users: {usersData.length}</span>
        <Select
            classNames={{base: "w-[50%] justify-end"}}
            label="Rows per page:"
            selectedKeys={[rowsPerPage.toString()]}
            onSelectionChange={(keys) => setRowsPerPage(Number(Array.from(keys)[0]))}
        >
            <SelectItem key="5">5</SelectItem>
            <SelectItem key="10">10</SelectItem>
            <SelectItem key="20">20</SelectItem>
        </Select>
      </div>
      <Table
        aria-label="Таблица"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor as () => {}}
        classNames={{
          wrapper: "min-h-[200px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          loadingContent={<Spinner />}
          loadingState={loading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Pagination
          classNames={{
            cursor: "bg-primary"
          }}
          page={page}
          total={totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};