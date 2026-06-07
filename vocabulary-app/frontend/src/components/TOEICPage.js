// src/components/TOEICPage.js
import React from 'react';
import { Link } from "react-router-dom";
function TOEICPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-orange-600 mb-6">TOEIC Practice Hub</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Full-length TOEIC tests with instant scoring, detailed explanations, and progress tracking.
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 transition">
                    Start TOEIC Test
                </button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* --- DANH SÁCH ĐỀ TOEIC --- */}
                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/224/new-economy-toeic-test-1/">
                                <h2 className="testitem-title">New Economy TOEIC Test 1</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/1213/new-economy-toeic-test-10/">
                                <h2 className="testitem-title">New Economy TOEIC Test 10</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/225/new-economy-toeic-test-2/">
                                <h2 className="testitem-title">New Economy TOEIC Test 2</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/226/new-economy-toeic-test-3/">
                                <h2 className="testitem-title">New Economy TOEIC Test 3</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/227/new-economy-toeic-test-4/">
                                <h2 className="testitem-title">New Economy TOEIC Test 4</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/228/new-economy-toeic-test-5/">
                                <h2 className="testitem-title">New Economy TOEIC Test 5</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/1209/new-economy-toeic-test-6/">
                                <h2 className="testitem-title">New Economy TOEIC Test 6</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/1214/new-economy-toeic-test-7/">
                                <h2 className="testitem-title">New Economy TOEIC Test 7</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/1211/new-economy-toeic-test-8/">
                                <h2 className="testitem-title">New Economy TOEIC Test 8</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/1212/new-economy-toeic-test-9/">
                                <h2 className="testitem-title">New Economy TOEIC Test 9</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* --- DANH SÁCH TIẾP THEO --- */}
                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/229/economy-old-format-toeic-4-test-1/">
                                <h2 className="testitem-title">Economy (old format) TOEIC 4 Test 1</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/230/economy-old-format-toeic-4-test-5/">
                                <h2 className="testitem-title">Economy (old format) TOEIC 4 Test 5</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/231/economy-old-format-toeic-5-test-3/">
                                <h2 className="testitem-title">Economy (old format) TOEIC 5 Test 3</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/232/economy-old-format-toeic-5-test-6/">
                                <h2 className="testitem-title">Economy (old format) TOEIC 5 Test 6</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/265/longman-toeic-old-format-test-1/">
                                <h2 className="testitem-title">Longman TOEIC (old format) Test 1</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/266/longman-toeic-old-format-test-2/">
                                <h2 className="testitem-title">Longman TOEIC (old format) Test 2</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="testitem-wrapper">
                            <a className="text-dark" href="https://study4.com/tests/267/longman-toeic-old-format-test-4/">
                                <h2 className="testitem-title">Longman TOEIC (old format) Test 4</h2>
                                <div className="testitem-info-wrapper">
                                    <div><span className="testitem-info"><span className="far fa-clock mr-1"></span>120 phút</span></div>
                                    <div><span className="testitem-info">7 phần thi | 200 câu hỏi</span></div>
                                </div>
                            </a>
                            <div className="testitem-start-test">
                                <Link to="/toeic/224" className="btn btn-block btn-outline-primary">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default TOEICPage;