const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/userAvatar/:id', auth, userCtrl.getUserAvatar)

router.post('/addFriend/:id/:from', auth, userCtrl.addFriend)

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

router.get('/getUserFriends/:id', auth, userCtrl.getUserFriends)

router.get('/getUserRequests/:id', auth, userCtrl.getUserRequests)

router.get('/getUserReceivedRequests/:id', auth, userCtrl.getUserReceivedRequests)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)


module.exports = router