import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AccountSummaryCard = () => {
  const something = 'something';

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Account Summary
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Account Name:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Revenues:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Expenses:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Balance:
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default AccountSummaryCard;
