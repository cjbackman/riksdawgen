import React from 'react';
import PropTypes from 'prop-types';

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

export class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(1);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.items.length !== prevProps.items.length) {
            this.setPage(1);
        }
    }

    setPage(page) {
        page = page || 1;
        let items = this.props.items;
        let totalItems = items.length;
        let pageSize = this.props.pageSize || 10;
        let pager = this.state.pager;
        let totalPages = Math.ceil(totalItems / pageSize);

        if (totalPages === 0 || page < 1 || page > totalPages) {
          this.setState({ pager: {} });
          this.props.onChangePage([]);
          return;
        }

        pager = this.getPager(totalItems, totalPages, pageSize, page);

        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, totalPages, pageSize, currentPage) {
        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let pages = range(startPage, endPage + 1);
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
          <div className="pagination">
            <ul>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>Första</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Sista</a>
                </li>
            </ul>
          </div>
        );
    }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
}