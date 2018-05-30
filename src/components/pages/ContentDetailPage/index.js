
import React from 'react';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectContentDetail } from './selector';


type Props = {
  login: (State) => void,
};

class ContentDetailPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      bookTitle: '',
      author: '',
      publisher: '',
      department: '',
      price: '',
      contact: '',
      description: '',
    };
    this.props.fetchContent(this.props.match.params.id);
  }


  render() {
    const contentList = this.props.contentList.toJS();
    return (
      <Container>
        <br />
        <h1>
          {contentList.title}
        </h1>
        <span>
          <FaUser />&nbsp;{_.get(contentList.user, 'nickname')}&nbsp;&nbsp;
        </span>
        <span style={{ alignSelf: 'flex-end' }}>
          <FaCalendarO />&nbsp;{moment(contentList.updated).format('YYYY/MM/DD HH:mm')}
        </span>
        <hr />
        <Row >
          <Col sm={6}>
            <img src="https://images-na.ssl-images-amazon.com/images/I/41-1VkO%2B1lL._SX359_BO1,204,203,200_.jpg" alt="algorithm" width="300px" />
          </Col>
          <Col sm={6}>
            <p><b>책 제목: </b>{contentList.bookTitle} </p>
            <p><b>저자: </b>{contentList.author}</p>
            <p><b>출판사: </b>{contentList.publisher}</p>
            <p><b>단과대: </b>{contentList.department}</p>
            <p><b>연락처: </b>연락처</p>
            <p style={{ color: 'red' }}><b>가격: </b>{contentList.price}</p>
            <Button color="danger" size="lg">장바구니</Button>


          </Col>
        </Row>
        <hr />
        <h3> 상세설명 </h3>
        <p> {contentList.content} </p>
        <hr />
        <h1> 댓글 </h1>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contentList: makeSelectContentDetail(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentDetailRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentDetailPage));
