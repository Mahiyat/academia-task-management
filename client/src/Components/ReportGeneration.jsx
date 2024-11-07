import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';

const ReportGeneration = ({ teacherId }) => {
  const [report, setReport] = useState('');

  // Fetch the report from the backend when the component mounts
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/report-generation/${teacherId}`); // Update with your actual API endpoint
        const data = await response.json();
        setReport(data.report); // Adjust based on the actual response structure
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [teacherId]);

  // Define styles for the PDF document
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
    downloadButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 5,
    },
  });

  // Create a PDF document
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
    <div style={{ position: 'relative' }}>
      {report ? (
        <>
          <PDFDownloadLink document={<MyDocument />} fileName="course_report.pdf">
            {({ loading }) => (
              <button style={styles.downloadButton} disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
          <div>
            <h2>Course Performance Report</h2>
            <ReactMarkdown>
              {report}
            </ReactMarkdown>
          </div>
        </>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default ReportGeneration;
