export const mockUser = {
  name: 'Officer Mbappe',
  role: 'Mobile Brigade Officer',
  station: 'Douala Port',
};

export const mockDashboard = {
  stats: [
    { label: 'Declarations checked', value: '184' },
    { label: 'Pending alerts', value: '12' },
    { label: 'Completed inspections', value: '67' },
  ],
  alerts: [
    { title: 'Destination mismatch', detail: 'Route differs from declared destination.' },
    { title: 'Vehicle not found', detail: 'Inspection team is rerouting to the last checkpoint.' },
  ],
  inspections: [
    { id: 'DEC-1042', status: 'Synced', route: 'Douala -> Yaoundé' },
    { id: 'DEC-1048', status: 'Pending', route: 'Ngaoundéré -> Garoua' },
  ],
};
