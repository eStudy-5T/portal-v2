import { useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { getInitials } from './get-initials'
import CloneAvatar from '../../../assets/images/clone.png'
import {
  IconUpload as UploadIcon,
  IconDownload as DownloadIcon,
  IconTrash,
  IconUserCheck
} from '@tabler/icons'

export const UsersList = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id)
    } else {
      newSelectedCustomerIds = []
    }

    setSelectedCustomerIds(newSelectedCustomerIds)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id)
    let newSelectedCustomerIds = []

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      )
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      )
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      )
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      )
    }

    setSelectedCustomerIds(newSelectedCustomerIds)
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography sx={{ m: 1, color: 'var(--color-primary)' }} variant="h4">
          Teacher verification requests
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            className='edu-btn btn-white btn-medium'
            startIcon={<UploadIcon fontSize="small" />}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            className='edu-btn btn-white btn-medium'
            startIcon={<DownloadIcon fontSize="small" />}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button className="edu-btn btn-medium" variant="contained">
            Add
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card sx={{ border: 'var(--border-width) solid var(--color-border)', borderRadius:'var(--radius)' }} >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ width: 500 }}>
                <div className="edu-search-box">
                  <input type="text" placeholder="Search customer" />
                  <button className="search-button">
                    <i className="icon-search-line" />
                  </button>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                <Button className="btn-transparent" disabled >
                  <IconUserCheck />
                </Button>
                <Button className="btn-transparent" disabled >
                  <IconTrash />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card {...rest} sx={{ mt: 3, border: 'var(--border-width) solid var(--color-border)', borderRadius:'var(--radius)' }}>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'var(--color-shade)' }}>
              <TableRow sx={{ textTransform: 'uppercase' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                    sx={{
                      '&.MuiCheckbox-indeterminate': {
                        color: 'var(--color-primary)'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="var(--color-primary)"
                  >
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="var(--color-primary)"
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="var(--color-primary)"
                  >
                    Location
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="var(--color-primary)"
                  >
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="var(--color-primary)"
                  >
                    Registration date
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                      sx={{
                        '&.Mui-checked': {
                          color: 'var(--color-primary)'
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar src={CloneAvatar} sx={{ mr: 2 }}>
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="var(--color-heading)"
                        variant="subtitle1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {format(customer.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            '& .MuiTablePagination-selectLabel': {
              marginBottom: 0
            },
            '& .MuiTablePagination-displayedRows': {
              marginBottom: 0
            }
          }}
        />
      </Card>
    </>
  )
}

UsersList.propTypes = {
  customers: PropTypes.array.isRequired
}
