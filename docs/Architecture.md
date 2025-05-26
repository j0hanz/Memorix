# Memorix Architecture Overview


## State Management Flow
```

🎮 GAME FLOW      🔐 AUTH FLOW         ⚙️ APP FLOW
────────────      ────────────         ────────────

gameActions      authActions          appActions
───────────      ───────────          ──────────
• setCards       • loginRequest      • setLoading
• flipCard       • loginSuccess      • setError
• setMatched     • logout            • clearError
• setScore       • refreshToken
• gameComplete   • setUser
• resetGame

▼                ▼                    ▼
gameReducer      authReducer          appReducer
──────────       ──────────          ──────────
• 147 lines      • 66 lines           • 43 lines

▼                ▼                    ▼
useGame          useAuth              useAppState
──────           ──────               ──────────
• Game state     • User session       • Global state
• Card logic     • Auth tokens        • Error handling
• Score mgmt     • Login/logout       • Loading states

▼                ▼                    ▼
Game             Auth                 App
Components       Components           Components
```

## Services Architecture

### Data Flow Layers

```
📱 Presentation Layer
  └─ Components
     • Game, Login, Profile
     • Stats, Ranking

🔄 State Management Layer
  └─ Hooks
     • useGame, useAuth, useApp
     • useServices, custom hooks

💼 Business Logic Layer
  └─ Services
     • authService, profileSvc
     • gameService, uploadSvc, githubSvc

🌐 Infrastructure Layer
  └─ API Layer
     • apiService, axios
     • token manager, error handler
```

### Service Dependencies

```
📦 apiService (foundation)
  ├─ 🔐 authService
  ├─ 👤 profileSvc
  ├─ 🎮 gameService
  │    └─ 📤 uploadSvc
  └─ 🐙 githubSvc (independent)
```

### Hook Integration

```
🔧 useServices (central aggregator)
  ├─ auth      → authService
  ├─ game      → gameService
  ├─ profile   → profileSvc
  ├─ upload    → uploadSvc
  └─ github    → githubSvc

📋 Feature Hooks:
  useLogin      useRegister    useProfile
  useScore      useBoard       useCommits
  useProfileScore             useLeaderboard
```

### Service Details

| Service     | Pattern      | Dependencies | Key Functions             |
| ----------- | ------------ | ------------ | ------------------------- |
| apiService  | Singleton    | axios        | HTTP abstraction, tokens  |
| authService | Composition  | apiService   | Auth flow, session mgmt   |
| profileSvc  | CRUD         | apiService   | Profile mgmt, file upload |
| gameService | Aggregation  | apiService   | Game data, leaderboard    |
| uploadSvc   | File handler | apiService   | Multipart uploads, images |
| githubSvc   | External API | axios        | GitHub integration        |

### Data Flow Examples

#### 🎮 Game Score Submission
```
Component → useGame.saveScore → gameActions.setScore
  → gameReducer → useServices.game.saveGameResult
  → apiService.post → Backend API
```

#### 🔐 User Authentication
```
Component → useAuth.login → authActions.loginRequest
  → authReducer → useServices.auth.login
  → apiService.post → Backend API → Token Storage
```

#### 👤 Profile Picture Upload
```
Component → useProfile.uploadPicture → profileActions.uploadStart
  → profileReducer → useServices.upload.uploadProfilePicture
  → uploadService.uploadFile → apiService.post → Backend API
```

## Architecture Benefits

### 🚀 Development Experience
- **Type Safety**: 100% coverage across state management
- **Autocomplete**: For all actions and services
- **Error Prevention**: Compile-time error detection
- **Self-documenting**: Clear action creators and service contracts

### 🏗️ Design Principles
- **Unidirectional Data Flow**: Predictable state updates
- **Modular Design**: Feature-based organization
- **Service Composition**: Reusable business logic
- **Single Responsibility**: Clear separation of concerns
