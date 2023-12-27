import React, { useEffect, useState } from 'react';
import './App.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const API_KEY = '78cb9638bd4241e3b9f5e32837a54f9a';
const url = 'https://newsapi.org/v2/everything?q=';

const topics = ['Home', 'Sports', 'Science', 'Politics'];

function App() {
  const [showMiniBrowser, setShowMiniBrowser] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState('');

  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchNews('India');
  }, []);

  async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    setArticles(data.articles);
  }

  function onTopicClick(topic) {
    let searchQuery='';
    switch (topic) {
      case 'Home':
        searchQuery = 'India'; 
        break;
      case 'Sports':
        searchQuery = 'Sports'; 
        break;
      case 'Science':
        searchQuery = 'Science'; 
        break;
      case 'Politics':
        searchQuery = 'Politics'; 
        break;
      default:
        searchQuery = 'India'; 
        break;
    }
    fetchNews(searchQuery);
    setSelectedTopic(topic);
  }

  function onSearchButtonClick() {
    if (!searchText) return;
    fetchNews(searchText);
    setSelectedTopic(null);
  }

  const [miniBrowserLoading, setMiniBrowserLoading] = useState(false);

  async function fetchNewsData(articleUrl) {
    try {
      setMiniBrowserLoading(true); 
      const res = await fetch(`${url}?url=${articleUrl}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setMiniBrowserLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setMiniBrowserLoading(false); 
    }
  }
  function onArticleClick(articleUrl) {
    setSelectedArticleUrl(articleUrl);
    setShowMiniBrowser(true);
    fetchNewsData(articleUrl);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: '#333', padding: '8px 16px', borderBottom: '2px solid #3949ab' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center', 
          }}>
          <span style={{ marginRight: '20px' }}>News App</span>
          <a className="github-link" href="https://github.com/Vermaji1811/XYZ_agg" target='_blank' rel="noreferrer">GitHub Link</a>
          </Typography>

          <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {topics.map((topic) => (
              <Button
                key={topic}
                color={selectedTopic === topic ? 'inherit' : 'inherit'}
                onClick={() => onTopicClick(topic)}
                sx={{
                  fontSize: '1rem',
                  fontWeight: selectedTopic === topic ? 'bold' : 'normal',
                  '&:hover': {
                    color: selectedTopic === topic ? '#fff' : '#fff',
                    backgroundColor: selectedTopic === topic ? '#303f9f' : 'transparent',
                  },
                }}
              >
                {topic}
              </Button>
            ))}
          </Box>
          <TextField
            id="search-text"
            label="Search"
            variant="standard"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="small"
            sx={{ marginRight: '8px', color: 'black'}}
          />
          <Button
            variant="outlined"
            onClick={onSearchButtonClick}
            sx={{ fontSize: '0.9rem', '&:hover': { backgroundColor: '#303f9f' } }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <main sx={{
          backgroundColor: '#202020',
          py: 8,
          transition: 'background-color 0.3s',
        }}>
        <Container sx={{ py: 4, marginLeft: 15}}>
          <Grid container columnSpacing={15} rowSpacing={7} justifyContent="center">
            {articles.map((article, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '270px',
                    backgroundColor: '#333',
                    color: '#fff',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: '#555',
                      transform: 'scale(1.05)',
                    },
                    transition: 'background-color 0.3s, transform 0.3s', 
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={article.urlToImage || 'https://pbs.twimg.com/card_img/1735229686869831680/Wi_ndBte?format=jpg&name=medium'}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.title || 'Big Breaking'}
                    </Typography>
                    <Typography>
                      {article.description ||
                        'Click on "Read More" to know more about the topic'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" size="small" onClick={() => onArticleClick(article.url)}>
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {showMiniBrowser && (
        <div style={{
          position: 'fixed',
          width: '500px',
          top: '57%',
          left: '83%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '2px', 
          borderRadius: '2px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
          }}>
          <Button
            variant="contained"
            onClick={()=> {setShowMiniBrowser(false)}}
            sx={{ position: 'absolute',
            top: '5px', 
            right: '5px', 
            padding: '5px 5px', 
            borderRadius: '5px', 
            backgroundColor: 'gray', 
            '&:hover' : {backgroundColor: '#fa0303'} ,
            color: 'white',
            border: 'none', 
            cursor: 'pointer', 
            minWidth: '20px', 
            width: 'auto', }}
          >X</Button>
          {miniBrowserLoading ? (<p style={{backgroundColor: "#fbfbfb", height: "50px", fontSize: "1.5rem", textAlign: "center"}}>Hold On...</p>) : (
          <iframe src={selectedArticleUrl} title="Mini Browser" style={{ width: '100%', height: 'calc(100vh - 100px)', border: 'none' }} allow="fullscreen" />
          )}
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
