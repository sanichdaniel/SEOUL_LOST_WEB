// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Container, Input, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, ButtonGroup } from 'reactstrap';
import { Creators as Actions } from './reducer';
import InterparkSearch from '../../../utils/InterparkSearch';
import { getToken } from '../../../utils/localStorage';

type Props = {
  newPost: (State) => void,
};

type State = {
  title: string,
  content: string,
  department: string,
  bookTitle: string,
  author: string,
  publisher: string,
  price: number,
  contact: string,
};

class NewPostPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'sales',
      bookSelected: false,
      title: '',
      content: '',
      department: '',
      bookTitle: '',
      author: '',
      publisher: '',
      price: 0,
      priceStandard: 0,
      contact: '',
      interparkImage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    let error = null;
    const { title, content, department, bookTitle, author, publisher, price, priceStandard, contact } = this.state;
    !contact && (error = '연락처를 입력하세요');
    !priceStandard && (error = '원가를 입력하세요');
    !price && (error = '가격을 입력하세요');
    !publisher && (error = '출판사를 입력하세요');
    !author && (error = '저자를 입력하세요');
    !bookTitle && (error = '책 제목을 입력하세요');
    !content && (error = '글 내용을 입력하세요');
    !department && (error = '해당 단과대를 입력하세요');
    !title && (error = '글 제목을 입력하세요');
    if (error) {
      alert(error);
      return;
    }

    const formData = new FormData();
    const data = _.omit(this.state, ['bookSelected', 'imagePreviewUrl', 'contentType']);
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.props.newPost(this.state.contentType, formData);
  }

  render() {
    return (
      <Container>
        {
          !getToken() && <Redirect to="/" />
        }
        <br />
        <h1>글 작성</h1>
        <hr />
        <Form>
          <FormGroup>
            <Label>글 제목</Label>
            <Input onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>글 종류</Label>
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => this.setState({ contentType: 'sales' })}
                  color={this.state.contentType === 'sales' ? 'primary' : 'secondary'}
                >팝니다</Button>
                <Button
                  onClick={() => this.setState({ contentType: 'purchases' })}
                  color={this.state.contentType === 'purchases' ? 'primary' : 'secondary'}
                >삽니다</Button>
              </ButtonGroup>
            </div>
          </FormGroup>
        </Form>
        <hr />
        <h4>책 정보 <InterparkSearch handleBook={b => this.setState(b)} /></h4>
        <hr />
        <Form>
          {this.state.interparkImage && <img src={this.state.interparkImage} alt="book" width="20%" />}
          {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl} alt="book" width="20%" />}
          <FormGroup>
            <Label>책 제목</Label>
            <Input disabled={this.state.bookSelected} value={this.state.bookTitle} onChange={({ target }) => this.setState({ bookTitle: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>저자</Label>
            <Input disabled={this.state.bookSelected} value={this.state.author} onChange={({ target }) => this.setState({ author: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>출판사</Label>
            <Input disabled={this.state.bookSelected} value={this.state.publisher} onChange={({ target }) => this.setState({ publisher: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>원가</Label>
            <InputGroup>
              <Input disabled={this.state.bookSelected} type="number" value={this.state.priceStandard} onChange={({ target }) => this.setState({ priceStandard: target.value })} />
              <InputGroupAddon>
              원
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>해당 단과대</Label>
            <Input onChange={({ target }) => this.setState({ department: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>중고 가격</Label>
            <InputGroup>
              <Input value={this.state.price} type="number" onChange={({ target }) => this.setState({ price: target.value })} />
              <InputGroupAddon>
                원
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>책 사진 추가</Label>
            <Input type="file" accept="image/*" onChange={this.handleImageChange} />
          </FormGroup>
        </Form>
        <hr />
        <h4>글 내용</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label >내용</Label>
            <Input type="textarea" onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input onChange={({ target }) => this.setState({ contact: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>등록하기</Button>
          <hr />
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  newPost: Actions.newPostRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
