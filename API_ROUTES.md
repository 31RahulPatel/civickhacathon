# CivicSpot API Routes Documentation

## Base URL: `http://localhost:5000`

---

## 🔐 Authentication Routes (`/api/auth`)

### POST `/api/auth/register`
- **Purpose**: User registration
- **Body**: `{ name, email, password, phone }`
- **Response**: `{ token, user }`

### POST `/api/auth/login`
- **Purpose**: User login
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`

### GET `/api/auth/profile`
- **Purpose**: Get user profile
- **Auth**: Required
- **Response**: `{ user }`

### PUT `/api/auth/profile`
- **Purpose**: Update user profile
- **Auth**: Required
- **Body**: `{ name, username }` + optional file upload
- **Response**: `{ user }`

---

## 📋 Reports Routes (`/api/reports`)

### GET `/api/reports`
- **Purpose**: Get all approved reports
- **Query**: `?status&type&priority&department`
- **Response**: `[reports]`

### POST `/api/reports`
- **Purpose**: Create new report
- **Auth**: Required
- **Body**: `{ title, description, type, customType, latitude, longitude, address }` + optional image
- **Response**: `report`

### GET `/api/reports/my-reports`
- **Purpose**: Get user's reports
- **Auth**: Required
- **Response**: `[reports]`

---

## 🏕️ Campaigns Routes (`/api/campaigns`)

### GET `/api/campaigns`
- **Purpose**: Get all campaigns
- **Response**: `[campaigns]`

### POST `/api/campaigns`
- **Purpose**: Create new campaign
- **Auth**: Required
- **Body**: `{ title, description, latitude, longitude, address, date }`
- **Response**: `campaign`

### POST `/api/campaigns/:id/join`
- **Purpose**: Join campaign
- **Auth**: Required
- **Response**: `{ message }`

---

## 📱 Posts Routes (`/api/posts`)

### GET `/api/posts`
- **Purpose**: Get all posts
- **Response**: `[posts]`

### GET `/api/posts/test`
- **Purpose**: Test route
- **Response**: `{ message: 'Posts route working' }`

### POST `/api/posts`
- **Purpose**: Create post
- **Auth**: Required
- **Body**: `{ caption, campaignId }` + optional image
- **Response**: `post`

### POST `/api/posts/:id/like`
- **Purpose**: Like/unlike post
- **Auth**: Required
- **Response**: `{ liked, likesCount }`

### POST `/api/posts/:id/comment`
- **Purpose**: Add comment
- **Auth**: Required
- **Body**: `{ text }`
- **Response**: `comment`

### GET `/api/posts/my-posts`
- **Purpose**: Get user's posts
- **Auth**: Required
- **Response**: `[posts]`

### DELETE `/api/posts/:id`
- **Purpose**: Delete post
- **Auth**: Required (owner only)
- **Response**: `{ message }`

---

## 🔔 Notifications Routes (`/api/notifications`)

### GET `/api/notifications`
- **Purpose**: Get user notifications
- **Auth**: Required
- **Response**: `[notifications]`

### PATCH `/api/notifications/:id/read`
- **Purpose**: Mark notification as read
- **Auth**: Required
- **Response**: `{ message }`

### GET `/api/notifications/unread-count`
- **Purpose**: Get unread count
- **Auth**: Required
- **Response**: `{ count }`

### POST `/api/notifications/admin/create`
- **Purpose**: Create notification (admin)
- **Auth**: Admin required
- **Body**: `{ title, message, type, isGlobal, userIds }`
- **Response**: `notification`

### GET `/api/notifications/admin/all`
- **Purpose**: Get all notifications (admin)
- **Auth**: Admin required
- **Response**: `[notifications]`

---

## 🏆 Rewards Routes (`/api/rewards`)

### GET `/api/rewards/my-rewards`
- **Purpose**: Get user rewards
- **Auth**: Required
- **Response**: `{ points, activities }`

### GET `/api/rewards/leaderboard`
- **Purpose**: Get leaderboard
- **Response**: `[topUsers]`

---

## 👑 Admin Routes (`/api/admin`)

### Dashboard & Analytics

#### GET `/api/admin/stats`
- **Purpose**: Dashboard statistics
- **Auth**: Department admin required
- **Response**: `{ totalReports, resolvedReports, activeCampaigns, totalUsers, totalPosts, department }`

#### GET `/api/admin/analytics`
- **Purpose**: Analytics data
- **Auth**: Department admin required
- **Response**: `{ engagement, charts, topUsers }`

### Reports Management

#### GET `/api/admin/reports`
- **Purpose**: Get reports for admin
- **Auth**: Department admin required
- **Response**: `[reports]`

#### PATCH `/api/admin/reports/:id/status`
- **Purpose**: Update report status
- **Auth**: Department admin required
- **Body**: `{ status }`
- **Response**: `report`

#### DELETE `/api/admin/reports/:id`
- **Purpose**: Delete report
- **Auth**: Department admin required
- **Response**: `{ message }`

### Campaigns Management

#### GET `/api/admin/campaigns`
- **Purpose**: Get all campaigns
- **Auth**: Department admin required
- **Response**: `[campaigns]`

#### PATCH `/api/admin/campaigns/:id/feature`
- **Purpose**: Feature campaign
- **Auth**: Department admin required
- **Body**: `{ isFeatured }`
- **Response**: `campaign`

### User Management

#### GET `/api/admin/users`
- **Purpose**: Get all users
- **Auth**: Super admin required
- **Response**: `[users]`

#### GET `/api/admin/department-admins`
- **Purpose**: Get department admins
- **Auth**: Super admin required
- **Response**: `[admins]`

#### POST `/api/admin/create-department-admin`
- **Purpose**: Create department admin
- **Auth**: Super admin required
- **Body**: `{ name, email, password, departmentId }`
- **Response**: `{ message, admin }`

#### PATCH `/api/admin/users/:id/toggle-status`
- **Purpose**: Toggle user status
- **Auth**: Super admin required
- **Response**: `{ message }`

#### PATCH `/api/admin/users/:id/points`
- **Purpose**: Update user points
- **Auth**: Super admin required
- **Body**: `{ points }`
- **Response**: `user`

### Posts Management

#### GET `/api/admin/posts`
- **Purpose**: Get all posts for moderation
- **Auth**: Department admin required
- **Response**: `[posts]`

#### DELETE `/api/admin/posts/:id`
- **Purpose**: Delete post
- **Auth**: Department admin required
- **Response**: `{ message }`

### Departments

#### GET `/api/admin/departments`
- **Purpose**: Get all departments
- **Auth**: Department admin required
- **Response**: `[departments]`

### Notifications Management

#### GET `/api/admin/notifications`
- **Purpose**: Get all notifications
- **Auth**: Department admin required
- **Response**: `[notifications]`

#### POST `/api/admin/notifications`
- **Purpose**: Create notification
- **Auth**: Department admin required
- **Body**: `{ title, message, type, isGlobal, userIds }`
- **Response**: `notification`

#### DELETE `/api/admin/notifications/:id`
- **Purpose**: Delete notification
- **Auth**: Department admin required
- **Response**: `{ message }`

### Rewards Management

#### GET `/api/admin/rewards`
- **Purpose**: Get rewards overview
- **Auth**: Department admin required
- **Response**: `{ allUsers, topUsers, totalPointsAwarded, recentActivities }`

#### POST `/api/admin/users/:id/award-points`
- **Purpose**: Award points to user
- **Auth**: Department admin required
- **Body**: `{ points, description }`
- **Response**: `{ message, user }`

### Moderation

#### GET `/api/admin/moderation/flagged`
- **Purpose**: Get flagged content
- **Auth**: Department admin required
- **Response**: `{ posts, reports }`

#### PATCH `/api/admin/moderation/:type/:id/flag`
- **Purpose**: Flag/unflag content
- **Auth**: Department admin required
- **Body**: `{ isFlagged }`
- **Response**: `{ message, item }`

#### GET `/api/admin/moderation/stats`
- **Purpose**: Get moderation stats
- **Auth**: Department admin required
- **Response**: `{ flaggedPosts, flaggedReports, totalPosts, totalReports }`

---

## 🏥 Health Check

### GET `/health`
- **Purpose**: Server health check
- **Response**: `{ status: 'OK', timestamp }`

---

## 🔒 Authentication Levels

- **None**: Public access
- **Required**: Valid JWT token
- **Admin**: Admin user required
- **Department Admin**: Department admin or super admin
- **Super Admin**: Super admin only

## 📝 Notes

- All authenticated routes require `Authorization: Bearer <token>` header
- File uploads use multipart/form-data
- All responses are in JSON format
- Error responses: `{ message: 'error description' }`