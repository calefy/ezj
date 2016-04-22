import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { paramParse } from '../libs/utils';

/**
 * 分页组件
 * - 根据总数计算分页数量
 * - 生成Link链接，以便url变化
 */
class Pagination extends Component {
    static propTypes = {
        page: PropTypes.number,
        pageSize: PropTypes.number,
        total: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired
    };
    static defaultProps = {
        page: 1,
        pageSize: 10
    };


    render() {
        const { page, pageSize, total, link, search } = this.props;
        const query = paramParse(decodeURIComponent(search));
        const pageTotal = Math.ceil( total / (query.pageSize || pageSize) ); // pageSize优先使用query中的，其次才是props中的值

        if (pageTotal <= 1) {
            return null;
        }

        const prevQuery = Object.assign({}, query, {page: Math.max(1, page-1)});
        const nextQuery = Object.assign({}, query, {page: Math.min(pageTotal, page + 1)});
        const firstQuery = Object.assign({}, query, {page: 1});
        const lastQuery = Object.assign({}, query, {page: pageTotal});

        return (
            <section className="pagination">
                { page == 1 ?
                    <span className="first disabled">第一页</span> :
                    <Link to={link} query={firstQuery} className="first">第一页</Link>
                }
                { page == 1 ?
                    <span className="previous disabled"></span> :
                    <Link to={link} query={prevQuery} className="previous"></Link>
                }
                {(() => {
                    let i, q, list = [];
                    for (i = 0; i < pageTotal; i++) {
                        // TODO: 考虑页数过多问题
                        q = Object.assign({}, query, {page: i + 1});
                        list.push(
                            <p key={i} className={i + 1 == page ? 'selected' : null}>
                                {i + 1 == page ?
                                    i + 1 :
                                    <Link to={link} query={q}>{i + 1}</Link>
                                }
                            </p>
                        );
                    }
                    return list;
                })()}
                { page == pageTotal ?
                    <span className="next disabled"></span> :
                    <Link to={link} query={nextQuery} className="next"></Link>
                }
                { page == pageTotal ?
                    <span className="last disabled">最后页</span> :
                    <Link to={link} query={lastQuery} className="last">最后页</Link>
                }
            </section>
        );
    }
}


module.exports = Pagination
