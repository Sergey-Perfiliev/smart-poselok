import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { TablePagination } from '@mui/material';

export default function DataTable({
	areaLabel,
	rows,
	columns,
	handleAcceptUser,
	handleDiscardUser,
	rowsPerPage = 10,
}) {
	const [page, setPage] = React.useState(0)

	const emptyRows =
		Math.max(0, (1 + page) * rowsPerPage - rows.length)

	const handleChangePage = (e, newPage) => {
		console.log(newPage)
		setPage(newPage)
	}

	return (
		<TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
			<Table area-label={areaLabel}>
				<TableHead>
					<TableRow>
						{columns.map(c => (
							<TableCell component="th" scope="row" key={c.field}>
								{c.headerName}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).map((r, i) => (
						<TableRow key={r.id}>
							<TableCell>{(page * rowsPerPage) + i + 1}</TableCell>
							<TableCell>{r.role}</TableCell>
							<TableCell>{r.email}</TableCell>
							<TableCell>{r.second_name}</TableCell>
							<TableCell>{r.first_name}</TableCell>
							<TableCell>{r.patronymic}</TableCell>
							<TableCell component="th" scope="row">
								<button onClick={(e) => handleAcceptUser(e, r.id)} className='btn'>Подтвердить</button>
							</TableCell>
							<TableCell component="th" scope="row">
								<button onClick={(e) => handleDiscardUser(e, r.id)} className='btn'>Отклонить</button>
							</TableCell>
						</TableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={8} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							count={rows.length}
							onPageChange={(e, newPage) => handleChangePage(e, newPage)}
							page={page}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[]}
							labelDisplayedRows={({ page }) => {
								return `Страница: ${page + 1} из ${Math.ceil(rows.length / rowsPerPage)}`
							}}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
