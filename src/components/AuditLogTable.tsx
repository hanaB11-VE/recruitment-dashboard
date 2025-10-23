import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the shape of one log entry
interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
}

const AuditLogTable: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [userFilter, setUserFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortColumn, setSortColumn] = useState<'timestamp' | 'user' | 'action' | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
 

  // Fetch data on component mount
  useEffect(() => {
    //axios.get('http://localhost:3001/logs')
    axios.get('https://my-json-server.typicode.com/hanaB11-VE/recruitment-dashboard/logs')

      .then(response => {
        setLogs(response.data);
        setFilteredLogs(response.data);
      })
      .catch(error => console.error('Error fetching logs:', error));
  }, []);

  // Handle filtering
 useEffect(() => {
  let filtered = [...logs];

  // Filter by user
  if (userFilter) {
    filtered = filtered.filter(log =>
      log.user.toLowerCase().includes(userFilter.toLowerCase())
    );
  }

  // Filter by date
  if (dateFilter) {
    filtered = filtered.filter(log =>
      log.timestamp.startsWith(dateFilter)
    );
  }

  // Sort by selected column
  if (sortColumn) {
    filtered.sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  setFilteredLogs(filtered);
}, [logs, userFilter, dateFilter, sortColumn, sortDirection]);

  //newly add
  const handleSort = (column: 'timestamp' | 'user' | 'action') => {
  if (sortColumn === column) {
    // Toggle sort direction
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};


  // Format timestamp (optional)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };
  const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  cursor: 'pointer',
};
// to export as a file

const exportToCSV = () => {
  const csvHeader = 'Timestamp,User,Action\n';
  const csvRows = filteredLogs
    .map(log => `${log.timestamp},${log.user},${log.action}`)
    .join('\n');
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvHeader + csvRows);

  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', 'audit-logs.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div style={{ margin: '30px' }}>
      <h2>📋 Audit Log</h2>

      {/* Filters */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Filter by user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Log Table */}
      <div style={{ overflowX: 'auto' }}>
        <button onClick={exportToCSV} style={{ marginBottom: '10px' }}>
  Export Logs (CSV)
</button>
      <table style={{ width: '100%', borderCollapse: 'collapse',minWidth: '600px' }}>
        {/*fgfgh*/}
        <thead>
  <tr style={{ background: '#f0f0f0' }}>
    <th onClick={() => handleSort('timestamp')} style={thStyle}>
      Timestamp {sortColumn === 'timestamp' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </th>
    <th onClick={() => handleSort('user')} style={thStyle}>
      User {sortColumn === 'user' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </th>
    <th onClick={() => handleSort('action')} style={thStyle}>
      Action {sortColumn === 'action' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </th>
  </tr>
</thead>

        {/*end of fgfgh*/}

        <tbody>
          {filteredLogs.map(log => (
            <tr key={log.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {formatDate(log.timestamp)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.user}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AuditLogTable;
