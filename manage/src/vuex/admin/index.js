import axios from 'axios';
import Bus from '@/Bus';
export default {
    state: {
        adminName: localStorage.adminName || null,
        adminId: localStorage.adminId || null
    },
    mutations: {
        CHANG_ADMININFO(state, info) {
            state.adminId = localStorage.adminId = info.adminId;
            state.adminName = localStorage.adminName = info.adminName;
        },
        OUT_LOGIN(state) {
            localStorage.clear();
            state.adminId = localStorage.adminId;
            state.adminName = localStorage.adminName;
            Bus.$message('退出成功')
        }
    },
    actions: {
        login({ commit }, { adminName, password, success, error }) {
            axios.post('/login', {
                adminName,
                password
            }).then(data => {
                if (data.ok === 1) {
                    commit('CHANG_ADMININFO', data);
                    success(data.msg)
                } else {
                    error(data.msg)
                }
            })
        }
    },
    getters: {

    }
}