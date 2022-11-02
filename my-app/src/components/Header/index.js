import React from 'react';
import {
    FaHome,
    FaSignInAlt,
    FaUserAlt,
    FaCircle,
    FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Nav } from './styled';

export default function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    function handleLogout(e) {
        e.preventDefault();
        dispatch(actions.LoginFailure());
        history.push('/');
    }

    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>
            <Link to="/register">
                <FaSignInAlt size={24} />
            </Link>
            {isLoggedIn ? (
                <Link onClick={handleLogout} to="/">
                    <FaPowerOff size={24} />
                </Link>
            ) : (
                <Link to="/login">
                    <FaUserAlt size={24} />
                </Link>
            )}

            {isLoggedIn && <FaCircle size={24} color="#66ff22" />}
        </Nav>
    );
}
