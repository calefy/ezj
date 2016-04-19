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

        return (
            <section className="pagination">
                <ul className="clearfix">
                    <li className="previous">
                        { page == 1 ? 
                            <span className="disabled">上一页</span> : 
                            <Link to={link} query={prevQuery}>上一页</Link>
                        }
                    </li>
                    {(() => {
                        let i, q, list = [];
                        for (i = 0; i < pageTotal; i++) {
                            // TODO: 考虑页数过多问题
                            q = Object.assign({}, query, {page: i + 1});
                            list.push(
                                <li key={i} className={i + 1 == page ? 'selected' : null}>
                                    {i + 1 == page ?
                                        i + 1 :
                                        <Link to={link} query={q}>{i + 1}</Link>
                                    }
                                </li>
                            );
                        }
                        return list;
                    })()}
                    <li className="next">
                        { page == Math.ceil(total/pageSize) ? 
                            <span className="disabled">下一页</span> : 
                            <Link to={link} query={nextQuery}>下一页</Link>
                        }
                    </li>
                </ul>
            </section>
        );
    }
}


module.exports = Pagination
