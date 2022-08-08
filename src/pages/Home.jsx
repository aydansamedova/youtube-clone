import React, { useEffect } from 'react';
import Video from '../companents/video/Video';
import Category from '../companents/category/Category';
import uniqid from 'uniqid';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeVideos } from '../redux/slices/video';
import InfiniteScroll from 'react-infinite-scroll-component';
import PuffLoader  from "react-spinners/PuffLoader";


function Home() {
  const dispatch = useDispatch();


  const { videos,activeCategorie } = useSelector((state) => state.videos);
  const fetchData = () => {
    if(activeCategorie==="All"){
      dispatch(getHomeVideos());
    }
    else{
      dispatch(getHomeVideos(activeCategorie));
    }
    dispatch(getHomeVideos());
  };

  useEffect(() => {
    dispatch(getHomeVideos);
  }, [dispatch]);
  return (
    <>
      <Container>
        <Category />
        <InfiniteScroll
          dataLength={videos.length} 
          next={fetchData}
          hasMore={true}
          loader={
            <div className="flex-grow-1 d-flex align-items-center text-danger justify-content-center" >
<PuffLoader color={"red"}/>
      </div>
          }
        >
          <Row style={{ background: '#000', paddingTop: '0.5rem' }}>
            {videos.map((el) => (
              <Col key={uniqid()} lg={3} md={4}>
                <Video videos={el} key={videos.id} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
    </>
  );
}

export default Home;
