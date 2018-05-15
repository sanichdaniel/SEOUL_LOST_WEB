// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Container, Pagination, PaginationLink, PaginationItem, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Row, Col, Button } from 'reactstrap';

type Props = {
  username: string,
  isAuthenticated: boolean,
}

class ContentList extends Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      nickname: '로그인 해주세요',
    };
  }


  render() {
    console.log(this.props);
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            팝니다
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
            삽니다
          </NavLink>
          </NavItem>
        </Nav>
        <Row>
          <Col sm={10}>
            <Pagination>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         1
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         2
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         3
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         4
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         5
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
          <Col sm={2}>
            <Button href="/createcontent">글 등록</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(ContentList);

