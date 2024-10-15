## 📝 Todo App

A simple React-based Todo app that allows users to manage their tasks with features like tabbed filtering, refreshing data, and optimistic updates for marking tasks as complete.

### 🚀 Features

1. **📋 View All Todos**
   - See all your tasks in a clean, responsive interface.
   - Each todo item displays a description, due date, and completion status.

2. **✅ Mark Tasks as Complete**
   - Click on the checkbox to mark a task as complete or incomplete.
   - An optimistic UI ensures that the changes are reflected instantly in the UI while the request is being processed in the background.

3. **🕒 Filter by Completion Status**
   - Switch between different views:
     - **All**: View all tasks.
     - **Completed**: View only completed tasks.
   - Tabs make it easy to toggle between these two views.

4. **🔄 Refresh Todos**
   - Click the **Refresh** button to manually refetch todos from the server.
   - After refreshing, the view resets to the **All** tab.

5. **⚡ Optimistic Updates**
   - When a todo is updated (marked complete or incomplete), the UI updates immediately for better user experience.
   - A checkmark (`✅`) will briefly appear to indicate the success of the update.

6. **🎨 Light/Dark Mode Support**
   - Styled with light and dark mode themes, adjusting the UI according to the user's preferences.

### 🛠️ Technologies Used

- **React**: For building the user interface.
- **Redux Toolkit**: For state management and API interactions using RTK Query.
- **Day.js**: For handling and formatting dates in todos.
- **CSS Flexbox**: For responsive and modern layout design.
- **React Hooks**: For managing component state and side effects (e.g., `useState`, `useEffect`).

### 🚧 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/karki011/simple-todo.git
   ```

2. **Install Dependencies**
   ```bash
   cd todo-app
   yarn
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root of your project and add the following content, replacing `YOUR_API_KEY` with your actual API key:
   
   ```bash
   VITE_API_KEY=YOUR_API_KEY
   ```

4. **Run the Development Server**
   ```bash
   yarn run dev
   ```
---

### 🎉 Thank You!

---