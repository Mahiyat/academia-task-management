import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import { Button, Typography, CircularProgress, Container, Box } from '@mui/material';

const ReportGeneration = ({ teacherId }) => {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/report-generation/${teacherId}`);
        const data = await response.json();
        setReport(data.report);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [teacherId]);

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    reportText: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Course Performance Report</Text>
          <Text style={styles.reportText}>{report}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <Container sx={{ position: 'relative', marginTop: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Loading report...
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <PDFDownloadLink document={<MyDocument />} fileName="course_report.pdf">
              {({ loading: pdfLoading }) => (
                <Button variant="contained" color="primary" disabled={pdfLoading}>
                  {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
          <Typography variant="h4" gutterBottom>
            Course Performance Report
          </Typography>
          <Box sx={{ border: 1, padding: 2, borderRadius: 1, borderColor: 'grey.300' }}>
            <ReactMarkdown>{report}</ReactMarkdown>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ReportGeneration;
