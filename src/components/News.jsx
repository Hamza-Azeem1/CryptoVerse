import moment from "moment";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useState } from "react";
import PropTypes from 'prop-types';
import profile from '../assets/profile.png'
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 10 });
    const { data } = useGetCryptosQuery(100)

    if (!cryptoNews) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a cryptocurrency"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                            <Option key={coin.name} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}

            {cryptoNews?.data?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <img src={news.thumbnail} alt={news.title} style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <Title className="news-title" level={4}>{news.title}</Title>
                            <p>
                                {news.description.length > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={profile} alt="" />
                                    <Text className="provider-name">Bitcoinist</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

News.propTypes = {
    simplified: PropTypes.bool.isRequired,
};

export default News;
