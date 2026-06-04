// AMDEX - Plataforma Escolar RPG Pixel Art
// Sistema completo con localStorage

const { useState, useEffect, useCallback, useRef } = React;

// ==================== CONSTANTES ====================

const ADMIN_USER = 'adminamazonica';
const ADMIN_PASS = 'adminamazonica123';
const ROLES = { ADMIN: 'admin', TEACHER: 'teacher', STUDENT: 'student' };
const MAX_LEVEL = 100;
const DEFAULT_BACKPACK_SIZE = 5;
const BACKPACK_LEVELS = { 1: 5, 2: 10, 3: 15 };

const CHARACTERS = [
  // Fuerza (5)
  { id: 1, name: 'Guerrero Fuerte', attr: 'strength', image: '🗡️' },
  { id: 2, name: 'Caballero Valiente', attr: 'strength', image: '⚔️' },
  { id: 3, name: 'Barbaro Robusto', attr: 'strength', image: '💪' },
  { id: 4, name: 'Paladín', attr: 'strength', image: '🛡️' },
  { id: 5, name: 'Luchador', attr: 'strength', image: '👊' },
  // Agilidad (5)
  { id: 6, name: 'Arquero Ágil', attr: 'agility', image: '🏹' },
  { id: 7, name: 'Asesino Sigiloso', attr: 'agility', image: '🗝️' },
  { id: 8, name: 'Ninja', attr: 'agility', image: '🥷' },
  { id: 9, name: 'Explorador', attr: 'agility', image: '🧗' },
  { id: 10, name: 'Acróbata', attr: 'agility', image: '🤸' },
  // Inteligencia (5)
  { id: 11, name: 'Mago', attr: 'intelligence', image: '🧙' },
  { id: 12, name: 'Hechicero', attr: 'intelligence', image: '✨' },
  { id: 13, name: 'Brujo Sabio', attr: 'intelligence', image: '🔮' },
  { id: 14, name: 'Alquimista', attr: 'intelligence', image: '⚗️' },
  { id: 15, name: 'Sabio Anciano', attr: 'intelligence', image: '🧠' }
];

const DEFAULT_ITEMS = [
  { id: 1, name: 'Poción de Salud', description: 'Restaura energía', price: 50, image: '🧪', type: 'consumable' },
  { id: 2, name: 'Mana Azul', description: 'Restaura maná', price: 60, image: '💙', type: 'consumable' },
  { id: 3, name: 'Antídoto', description: 'Cura envenenamientos', price: 75, image: '☠️', type: 'consumable' },
  { id: 4, name: 'Éter', description: 'Restaura todas las energías', price: 100, image: '💫', type: 'consumable' },
  { id: 5, name: 'Revivir', description: 'Trae de vuelta', price: 150, image: '❤️', type: 'consumable' },
  { id: 6, name: 'Espada de Fuego', description: 'Arma legendaria', price: 200, image: '🔥', type: 'reusable' },
  { id: 7, name: 'Escudo Mágico', description: 'Protección total', price: 180, image: '🔷', type: 'reusable' },
  { id: 8, name: 'Casco de Cristal', description: 'Defensa especial', price: 120, image: '👑', type: 'reusable' },
  { id: 9, name: 'Botas de Velocidad', description: 'Aumenta agilidad', price: 140, image: '👢', type: 'reusable' },
  { id: 10, name: 'Anillo de Sabiduría', description: 'Aumenta inteligencia', price: 160, image: '💍', type: 'reusable' },
  { id: 11, name: 'Talismán de Suerte', description: 'Atrae fortuna', price: 90, image: '🌟', type: 'reusable' },
  { id: 12, name: 'Llave Misteriosa', description: 'Abre secretos', price: 130, image: '🗝️', type: 'reusable' },
  { id: 13, name: 'Pergamino Antiguo', description: 'Conocimiento perdido', price: 110, image: '📜', type: 'non-usable' },
  { id: 14, name: 'Cristal Brillante', description: 'Componente raro', price: 95, image: '💎', type: 'non-usable' },
  { id: 15, name: 'Polvo de Oro', description: 'Material valioso', price: 80, image: '✨', type: 'non-usable' },
  { id: 16, name: 'Rosa Negra', description: 'Flor mágica', price: 70, image: '🌹', type: 'reusable' },
  { id: 17, name: 'Brazalete de Hierro', description: 'Aumenta fuerza', price: 150, image: '⚙️', type: 'reusable' },
  { id: 18, name: 'Capa Invisible', description: 'Permite esconderse', price: 200, image: '👻', type: 'reusable' },
  { id: 19, name: 'Antorcha Eterna', description: 'Luz permanente', price: 85, image: '🔦', type: 'reusable' },
  { id: 20, name: 'Lápiz del Destino', description: 'Modifica el futuro', price: 220, image: '✏️', type: 'reusable' },
  { id: 21, name: 'Semilla de Árbol', description: 'Crea vida', price: 100, image: '🌱', type: 'consumable' },
  { id: 22, name: 'Fruta Prohibida', description: 'Poder temporal', price: 125, image: '🍎', type: 'consumable' },
  { id: 23, name: 'Agua Sagrada', description: 'Purificación', price: 110, image: '💧', type: 'consumable' },
  { id: 24, name: 'Carbón Negro', description: 'Material oscuro', price: 60, image: '⬛', type: 'non-usable' },
  { id: 25, name: 'Espejo Mágico', description: 'Refleja magia', price: 145, image: '🪞', type: 'reusable' },
  { id: 26, name: 'Campana de Plata', description: 'Invoca ayuda', price: 135, image: '🔔', type: 'reusable' },
  { id: 27, name: 'Pergamino de Hechizos', description: 'Libro de magia', price: 165, image: '📖', type: 'non-usable' },
  { id: 28, name: 'Gema Preciosa', description: 'Joya valiosa', price: 190, image: '💠', type: 'non-usable' },
  { id: 29, name: 'Tridente Acuático', description: 'Arma de agua', price: 210, image: '🔱', type: 'reusable' },
  { id: 30, name: 'Llave del Tesoro', description: 'Acceso a riquezas', price: 175, image: '🗝️', type: 'reusable' }
];

// ==================== UTILIDADES DE ALMACENAMIENTO ====================

const StorageManager = {
  getUsers: () => JSON.parse(localStorage.getItem('amdex_users') || '[]'),
  setUsers: (users) => localStorage.setItem('amdex_users', JSON.stringify(users)),
  getCurrentUser: () => JSON.parse(localStorage.getItem('amdex_current_user') || 'null'),
  setCurrentUser: (user) => localStorage.setItem('amdex_current_user', JSON.stringify(user)),
  getTasks: () => JSON.parse(localStorage.getItem('amdex_tasks') || '[]'),
  setTasks: (tasks) => localStorage.setItem('amdex_tasks', JSON.stringify(tasks)),
  getCatalog: () => JSON.parse(localStorage.getItem('amdex_catalog') || JSON.stringify(DEFAULT_ITEMS)),
  setCatalog: (items) => localStorage.setItem('amdex_catalog', JSON.stringify(items)),
  getNotifications: (userId) => JSON.parse(localStorage.getItem(`amdex_notifications_${userId}`) || '[]'),
  addNotification: (userId, notif) => {
    const notifs = StorageManager.getNotifications(userId);
    notifs.push({ ...notif, id: Date.now(), date: new Date().toLocaleString('es-ES') });
    localStorage.setItem(`amdex_notifications_${userId}`, JSON.stringify(notifs.slice(-50)));
  },
  clearNotifications: (userId) => localStorage.setItem(`amdex_notifications_${userId}`, JSON.stringify([]))
};

// ==================== CÁLCULO DE XP ====================

const calculateXpForLevel = (level) => Math.floor(100 * Math.pow(level, 1.5));

const getTierInfo = (level) => {
  if (level <= 20) return { tier: 1, name: 'Aprendiz', rewards: ['Cosméticos', 'Insignias', 'Títulos'] };
  if (level <= 60) return { tier: 2, name: 'Aventurero', rewards: ['Acceso prioritario a biblioteca', 'Beneficios escolares'] };
  if (level < 100) return { tier: 3, name: 'Campeón', rewards: ['Selección de asiento', 'Beneficios escolares avanzados'] };
  return { tier: 4, name: 'Leyenda', rewards: ['Receso Premium', 'Prioridad en filas'] };
};

// ==================== PANTALLA DE LOGIN ====================

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Completa todos los campos');
      return;
    }

    const users = StorageManager.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      StorageManager.setCurrentUser(user);
      onLogin(user);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const initializeAdmin = () => {
    const users = StorageManager.getUsers();
    const adminExists = users.find(u => u.role === ROLES.ADMIN);
    if (!adminExists) {
      const adminUser = {
        id: Date.now(),
        username: ADMIN_USER,
        password: ADMIN_PASS,
        role: ROLES.ADMIN,
        character: null,
        level: 1,
        xp: 0,
        amzv: 1000,
        attributes: { strength: 10, agility: 10, intelligence: 10 },
        inventory: [],
        backpackLevel: 1,
        avatar: '🧙'
      };
      users.push(adminUser);
      StorageManager.setUsers(users);
    }
  };

  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 via-yellow-100 to-green-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl pixel-float">🌞</div>
      <div className="absolute bottom-20 right-10 text-5xl pixel-float" style={{animationDelay: '0.5s'}}>🌳</div>
      <div className="absolute top-1/4 right-20 text-4xl pixel-float" style={{animationDelay: '1s'}}>🐝</div>

      <div className="bg-gradient-to-b from-orange-100 to-yellow-100 p-8 retro-border max-w-md w-full mx-4 relative z-10">
        <h1 className="text-center text-2xl mb-8 pixel-text">⚔️ AMDEX ⚔️</h1>
        <h2 className="text-center text-sm mb-6 pixel-text">Plataforma Escolar RPG</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs pixel-text mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-3 border-2 border-yellow-800 bg-yellow-50 pixel-container"
              placeholder="usuario"
            />
          </div>
          <div>
            <label className="block text-xs pixel-text mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-3 border-2 border-yellow-800 bg-yellow-50 pixel-container"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <div className="mt-4 text-red-700 text-xs pixel-text text-center">{error}</div>}

        <button
          onClick={handleLogin}
          className="w-full mt-6 retro-button hover:shadow-lg"
        >
          Ingresar
        </button>

        <p className="text-center text-xs mt-4 pixel-text">Demo: adminamazonica / adminamazonica123</p>
      </div>
    </div>
  );
}

// ==================== PANEL ESTUDIANTE ====================

function StudentPanel({ user, onLogout, onUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [inventory, setInventory] = useState(user.inventory || []);
  const [amzv, setAmzv] = useState(user.amzv);
  const [xp, setXp] = useState(user.xp);
  const [level, setLevel] = useState(user.level);
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedItem, setSelectedItem] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadTasks();
    loadTeachers();
    loadNotifications();
    const interval = setInterval(() => loadTasks(), 2000);
    return () => clearInterval(interval);
  }, []);

  const loadTasks = () => {
    const allTasks = StorageManager.getTasks();
    const now = Date.now();
    const studentTasks = allTasks.filter(t => {
      const isExpired = t.expiresAt && now > t.expiresAt;
      if (isExpired) return false;
      if (t.type === 'global') return true;
      if (t.type === 'course') return t.courseStudents && t.courseStudents.includes(user.id);
      return false;
    });
    setTasks(studentTasks);
  };

  const loadTeachers = () => {
    const users = StorageManager.getUsers();
    setTeachers(users.filter(u => u.role === ROLES.TEACHER));
  };

  const loadNotifications = () => {
    setNotifications(StorageManager.getNotifications(user.id));
  };

  const completeTask = (taskId) => {
    const allTasks = StorageManager.getTasks();
    const taskIndex = allTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      allTasks[taskIndex].completedBy = allTasks[taskIndex].completedBy || [];
      if (!allTasks[taskIndex].completedBy.includes(user.id)) {
        allTasks[taskIndex].completedBy.push(user.id);
        StorageManager.setTasks(allTasks);
        loadTasks();
      }
    }
  };

  const claimReward = (taskId, reward) => {
    const allTasks = StorageManager.getTasks();
    const task = allTasks.find(t => t.id === taskId);
    if (task && task.rewards && task.rewards[user.id]) {
      const r = task.rewards[user.id];
      let newXp = xp + r.xp;
      let newLevel = level;
      let newAmzv = amzv + r.amzv;

      while (newXp >= calculateXpForLevel(newLevel) && newLevel < MAX_LEVEL) {
        newXp -= calculateXpForLevel(newLevel);
        newLevel++;
      }

      setXp(newXp);
      setLevel(newLevel);
      setAmzv(newAmzv);

      const users = StorageManager.getUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].xp = newXp;
        users[userIndex].level = newLevel;
        users[userIndex].amzv = newAmzv;
        users[userIndex].attributes[r.attributeBoost] = (users[userIndex].attributes[r.attributeBoost] || 0) + 0.2;
        StorageManager.setUsers(users);
        StorageManager.setCurrentUser(users[userIndex]);
        onUpdate(users[userIndex]);
      }

      delete task.rewards[user.id];
      StorageManager.setTasks(allTasks);
      loadTasks();
    }
  };

  const useItem = (itemId, teacherId) => {
    const itemIndex = inventory.findIndex(inv => inv.id === itemId);
    if (itemIndex !== -1) {
      const item = inventory[itemIndex];
      const catalog = StorageManager.getCatalog();
      const catalogItem = catalog.find(c => c.id === item.catalogId);

      if (catalogItem.type === 'consumable') {
        inventory[itemIndex].quantity--;
        if (inventory[itemIndex].quantity <= 0) {
          inventory.splice(itemIndex, 1);
        }
      }

      setInventory([...inventory]);

      const users = StorageManager.getUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].inventory = inventory;
        StorageManager.setUsers(users);
        StorageManager.setCurrentUser(users[userIndex]);
      }

      const teacher = teachers.find(t => t.id === teacherId);
      if (teacher) {
        StorageManager.addNotification(teacherId, {
          type: 'item_used',
          student: user.username,
          item: catalogItem.name,
          icon: catalogItem.image
        });
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-yellow-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 retro-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{user.avatar}</div>
            <div className="pixel-text text-white">
              <div className="text-sm">{user.username}</div>
              <div className="text-xs">Nivel {level} - {getTierInfo(level).name}</div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right pixel-text text-white text-xs">
              <div>💰 {amzv} AMZ V</div>
              <div>⭐ {xp}/{calculateXpForLevel(level)} XP</div>
            </div>
            <button
              onClick={onLogout}
              className="retro-button text-xs"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-yellow-200 border-b-4 border-yellow-800">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'tasks' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          📋 Tareas
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'inventory' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          🎒 Inventario
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'notifications' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          🔔 Notificaciones ({notifications.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">📋 Tareas Disponibles</h2>
            {tasks.length === 0 ? (
              <p className="pixel-text text-yellow-800">Sin tareas disponibles</p>
            ) : (
              tasks.map(task => {
                const isCompleted = task.completedBy?.includes(user.id);
                const hasReward = task.rewards && task.rewards[user.id];
                const timeLeft = task.expiresAt ? Math.max(0, Math.floor((task.expiresAt - Date.now()) / 1000 / 60)) : null;

                return (
                  <div key={task.id} className={`retro-border p-4 ${isCompleted ? 'task-completed' : 'task-pending'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold pixel-text text-sm">{task.title}</h3>
                        {task.createdBy && (
                          <p className="text-xs pixel-text text-gray-700">👨‍🏫 {StorageManager.getUsers().find(u => u.id === task.createdBy)?.username || 'Profesor'}</p>
                        )}
                      </div>
                      {timeLeft !== null && (
                        <span className="text-xs pixel-text bg-yellow-200 px-2 py-1 rounded">{timeLeft} min</span>
                      )}
                    </div>
                    <p className="text-xs pixel-text text-gray-800 mb-3">{task.description}</p>
                    <div className="flex gap-2">
                      {!isCompleted && (
                        <button
                          onClick={() => completeTask(task.id)}
                          className="retro-button text-xs flex-1"
                        >
                          ✅ Completar
                        </button>
                      )}
                      {isCompleted && !hasReward && (
                        <span className="text-xs pixel-text text-green-700">✓ Completada</span>
                      )}
                      {hasReward && (
                        <button
                          onClick={() => claimReward(task.id, task.rewards[user.id])}
                          className="retro-button text-xs flex-1 bg-green-600"
                        >
                          🎁 Reclamar Recompensa
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">🎒 Tu Inventario</h2>
            <p className="text-xs pixel-text">Espacio: {inventory.reduce((sum, inv) => sum + inv.quantity, 0)}/{BACKPACK_LEVELS[user.backpackLevel || 1]}</p>
            {inventory.length === 0 ? (
              <p className="pixel-text text-yellow-800">Inventario vacío</p>
            ) : (
              inventory.map((inv, idx) => {
                const catalogItem = StorageManager.getCatalog().find(c => c.id === inv.catalogId);
                return (
                  <div key={idx} className="retro-border p-3 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl">{catalogItem.image}</span>
                      <div className="flex-1 ml-3">
                        <h4 className="font-bold pixel-text text-xs">{catalogItem.name}</h4>
                        <p className="text-xs pixel-text text-gray-700">{catalogItem.description}</p>
                        <p className="text-xs pixel-text">Cantidad: {inv.quantity}</p>
                      </div>
                    </div>
                    {catalogItem.type !== 'non-usable' && (
                      <div className="flex gap-2">
                        <select
                          onChange={(e) => setSelectedItem({ ...inv, teacherId: parseInt(e.target.value) })}
                          className="flex-1 p-2 text-xs border-2 border-yellow-800"
                        >
                          <option value="">Selecciona profesor</option>
                          {teachers.map(t => (
                            <option key={t.id} value={t.id}>{t.username}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => selectedItem?.teacherId && useItem(inv.catalogId, selectedItem.teacherId)}
                          className="retro-button text-xs"
                          disabled={!selectedItem?.teacherId}
                        >
                          Usar
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm pixel-text">🔔 Notificaciones</h2>
              <button
                onClick={() => { StorageManager.clearNotifications(user.id); loadNotifications(); }}
                className="retro-button text-xs"
              >
                Limpiar
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="pixel-text text-yellow-800">Sin notificaciones</p>
            ) : (
              notifications.reverse().map((notif, idx) => (
                <div key={idx} className="retro-border p-3 bg-blue-100">
                  <p className="text-xs pixel-text">{notif.date}</p>
                  <p className="text-xs pixel-text mt-1">{notif.message || `Objeto usado: ${notif.item}`}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PANEL PROFESOR ====================

function TeacherPanel({ user, onLogout, onUpdate }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskType, setTaskType] = useState('global');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rewardType, setRewardType] = useState('basic');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadTasks();
    loadStudents();
    loadNotifications();
    const interval = setInterval(() => {
      loadTasks();
      loadNotifications();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadTasks = () => {
    const allTasks = StorageManager.getTasks();
    const teacherTasks = allTasks.filter(t => t.createdBy === user.id);
    setTasks(teacherTasks);
  };

  const loadStudents = () => {
    const users = StorageManager.getUsers();
    const allStudents = users.filter(u => u.role === ROLES.STUDENT);
    const sorted = allStudents.sort((a, b) => {
      const aLastTask = StorageManager.getTasks()
        .filter(t => t.completedBy?.includes(a.id))
        .map(t => t.createdAt || 0)
        .reduce((max, t) => Math.max(max, t), 0);
      const bLastTask = StorageManager.getTasks()
        .filter(t => t.completedBy?.includes(b.id))
        .map(t => t.createdAt || 0)
        .reduce((max, t) => Math.max(max, t), 0);
      return bLastTask - aLastTask || (b.level - a.level) || a.username.localeCompare(b.username);
    });
    setStudents(sorted);
  };

  const loadNotifications = () => {
    setNotifications(StorageManager.getNotifications(user.id));
  };

  const createTask = () => {
    if (!taskTitle || !taskDesc) return;
    const allTasks = StorageManager.getTasks();
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDesc,
      type: taskType,
      createdBy: user.id,
      createdAt: Date.now(),
      expiresAt: taskType === 'course' ? Date.now() + 7 * 24 * 60 * 60 * 1000 : null,
      courseStudents: taskType === 'course' ? selectedStudents : [],
      completedBy: [],
      rewards: {}
    };
    allTasks.push(newTask);
    StorageManager.setTasks(allTasks);
    setTaskTitle('');
    setTaskDesc('');
    setSelectedStudents([]);
    loadTasks();
  };

  const validateTask = () => {
    if (!selectedTask || !selectedStudent) return;

    const rewardMap = {
      basic: { amzv: 1, xp: 10 },
      intermediate: { amzv: 2, xp: 20 },
      difficult: { amzv: 3, xp: 30 }
    };
    const rData = rewardMap[rewardType];
    const attributes = ['strength', 'agility', 'intelligence'];
    const randomAttr = attributes[Math.floor(Math.random() * attributes.length)];

    const allTasks = StorageManager.getTasks();
    const taskIndex = allTasks.findIndex(t => t.id === selectedTask.id);
    if (taskIndex !== -1) {
      if (!allTasks[taskIndex].rewards) allTasks[taskIndex].rewards = {};
      allTasks[taskIndex].rewards[selectedStudent.id] = {
        amzv: rData.amzv,
        xp: rData.xp,
        attributeBoost: randomAttr
      };
      StorageManager.setTasks(allTasks);
      loadTasks();
    }
  };

  const toggleStudent = (studentId) => {
    setSelectedStudents(
      selectedStudents.includes(studentId)
        ? selectedStudents.filter(id => id !== studentId)
        : [...selectedStudents, studentId]
    );
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-yellow-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 retro-border">
        <div className="flex justify-between items-center">
          <div className="pixel-text text-white">
            <div className="text-sm">👨‍🏫 {user.username}</div>
            <div className="text-xs">Panel de Profesor</div>
          </div>
          <button
            onClick={onLogout}
            className="retro-button text-xs"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-yellow-200 border-b-4 border-yellow-800">
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'create' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          ✏️ Crear Tarea
        </button>
        <button
          onClick={() => setActiveTab('validate')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'validate' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          ✅ Validar Tareas
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 p-2 text-xs pixel-text ${activeTab === 'notifications' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          🔔 Notificaciones ({notifications.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm pixel-text mb-4">✏️ Crear Nueva Tarea</h2>
            <div className="retro-border p-4 bg-white">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs pixel-text mb-2">Tipo de Tarea</label>
                  <select
                    value={taskType}
                    onChange={(e) => {
                      setTaskType(e.target.value);
                      setSelectedStudents([]);
                    }}
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  >
                    <option value="global">Global (Para todos)</option>
                    <option value="course">De Curso (Estudiantes específicos)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs pixel-text mb-2">Título</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-2 border-2 border-yellow-800"
                    placeholder="Título de la tarea"
                  />
                </div>
                <div>
                  <label className="block text-xs pixel-text mb-2">Descripción</label>
                  <textarea
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    className="w-full p-2 border-2 border-yellow-800 h-24"
                    placeholder="Descripción de la tarea"
                  />
                </div>
                {taskType === 'course' && (
                  <div>
                    <label className="block text-xs pixel-text mb-2">Seleccionar Estudiantes</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {students.map(student => (
                        <label key={student.id} className="flex items-center text-xs pixel-text">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            className="mr-2"
                          />
                          {student.username} (Nivel {student.level})
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={createTask}
                  disabled={!taskTitle || !taskDesc || (taskType === 'course' && selectedStudents.length === 0)}
                  className="w-full retro-button"
                >
                  🎯 Crear Tarea
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validate' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">✅ Validar Tareas</h2>
            {tasks.length === 0 ? (
              <p className="pixel-text text-yellow-800">Sin tareas creadas</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tasks List */}
                <div className="space-y-2">
                  <h3 className="text-xs pixel-text font-bold">Mis Tareas</h3>
                  {tasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`w-full text-left p-3 retro-border text-xs ${selectedTask?.id === task.id ? 'bg-yellow-300' : 'bg-white'}`}
                    >
                      <div className="pixel-text">{task.title}</div>
                      <div className="text-xs text-gray-700">{task.type === 'global' ? '🌍 Global' : '👥 Curso'}</div>
                    </button>
                  ))}
                </div>

                {/* Students List */}
                {selectedTask && (
                  <div className="space-y-2">
                    <h3 className="text-xs pixel-text font-bold">Estudiantes</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {students.map(student => {
                        const isCompleted = selectedTask.completedBy?.includes(student.id);
                        const hasReward = selectedTask.rewards?.[student.id];
                        return (
                          <button
                            key={student.id}
                            onClick={() => setSelectedStudent(student)}
                            className={`w-full text-left p-3 retro-border text-xs ${
                              selectedStudent?.id === student.id
                                ? 'bg-yellow-300'
                                : isCompleted
                                ? 'bg-green-200'
                                : 'bg-white'
                            }`}
                          >
                            <div className="pixel-text">{student.username} (Nivel {student.level})</div>
                            {isCompleted && !hasReward && <div className="text-xs text-green-700">✓ Completada</div>}
                            {hasReward && <div className="text-xs text-blue-700">🎁 Recompensa pendiente</div>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reward Section */}
            {selectedTask && selectedStudent && (
              <div className="retro-border p-4 bg-white mt-4">
                <h3 className="text-xs pixel-text font-bold mb-3">Otorgar Recompensa a {selectedStudent.username}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs pixel-text mb-2">Nivel de Dificultad</label>
                    <select
                      value={rewardType}
                      onChange={(e) => setRewardType(e.target.value)}
                      className="w-full p-2 border-2 border-yellow-800 text-xs"
                    >
                      <option value="basic">Básica (1 AMZ V, 10 XP)</option>
                      <option value="intermediate">Intermedia (2 AMZ V, 20 XP)</option>
                      <option value="difficult">Difícil (3 AMZ V, 30 XP)</option>
                    </select>
                  </div>
                  <button
                    onClick={validateTask}
                    className="w-full retro-button bg-green-600"
                  >
                    ✓ Validar y Recompensar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">🔔 Notificaciones de Objetos Usados</h2>
            {notifications.length === 0 ? (
              <p className="pixel-text text-yellow-800">Sin notificaciones</p>
            ) : (
              notifications.reverse().map((notif, idx) => (
                <div key={idx} className="retro-border p-3 bg-blue-100">
                  <p className="text-xs pixel-text font-bold">{notif.date}</p>
                  <p className="text-xs pixel-text mt-1">
                    {notif.icon} {notif.student} usó: <strong>{notif.item}</strong>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PANEL ADMINISTRADOR ====================

function AdminPanel({ user, onLogout, onUpdate }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState(ROLES.STUDENT);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('consumable');
  const [amzvAmount, setAmzvAmount] = useState('');
  const [amzvOperation, setAmzvOperation] = useState('add');
  const [selectedChar, setSelectedChar] = useState(null);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    loadUsers();
    loadCatalog();
  }, []);

  const loadUsers = () => {
    setUsers(StorageManager.getUsers());
  };

  const loadCatalog = () => {
    setCatalog(StorageManager.getCatalog());
  };

  const createUser = () => {
    if (!newUsername || !newPassword) return;
    const allUsers = StorageManager.getUsers();
    const userExists = allUsers.find(u => u.username === newUsername);
    if (userExists) {
      alert('El usuario ya existe');
      return;
    }
    const newUser = {
      id: Date.now(),
      username: newUsername,
      password: newPassword,
      role: newRole,
      character: CHARACTERS[0],
      level: 1,
      xp: 0,
      amzv: 100,
      attributes: { strength: 0, agility: 0, intelligence: 0 },
      inventory: [],
      backpackLevel: 1,
      avatar: userImage || '👤'
    };
    allUsers.push(newUser);
    StorageManager.setUsers(allUsers);
    setNewUsername('');
    setNewPassword('');
    setNewRole(ROLES.STUDENT);
    setUserImage('');
    loadUsers();
  };

  const deleteUser = (userId) => {
    if (userId === user.id) {
      alert('No puedes eliminarte a ti mismo');
      return;
    }
    const allUsers = StorageManager.getUsers();
    const index = allUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
      allUsers.splice(index, 1);
      StorageManager.setUsers(allUsers);
      setSelectedUser(null);
      loadUsers();
    }
  };

  const updateUserAmzv = () => {
    if (!selectedUser || !amzvAmount) return;
    const allUsers = StorageManager.getUsers();
    const userIndex = allUsers.findIndex(u => u.id === selectedUser.id);
    if (userIndex !== -1) {
      const amount = parseInt(amzvAmount);
      if (amzvOperation === 'add') {
        allUsers[userIndex].amzv += amount;
      } else {
        allUsers[userIndex].amzv = Math.max(0, allUsers[userIndex].amzv - amount);
      }
      StorageManager.setUsers(allUsers);
      setSelectedUser(allUsers[userIndex]);
      setAmzvAmount('');
      loadUsers();
    }
  };

  const updateItem = () => {
    if (!selectedItem || !itemName || !itemPrice) return;
    const allItems = StorageManager.getCatalog();
    const itemIndex = allItems.findIndex(i => i.id === selectedItem.id);
    if (itemIndex !== -1) {
      allItems[itemIndex].name = itemName;
      allItems[itemIndex].description = itemDesc;
      allItems[itemIndex].price = parseInt(itemPrice);
      allItems[itemIndex].type = itemType;
      StorageManager.setCatalog(allItems);
      setSelectedItem(allItems[itemIndex]);
      loadCatalog();
    }
  };

  const handleImageUpload = (e, isUser = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isUser) {
          setUserImage(event.target.result);
        } else if (selectedItem) {
          const allItems = StorageManager.getCatalog();
          const itemIndex = allItems.findIndex(i => i.id === selectedItem.id);
          if (itemIndex !== -1) {
            allItems[itemIndex].image = event.target.result;
            StorageManager.setCatalog(allItems);
            setSelectedItem(allItems[itemIndex]);
            loadCatalog();
          }
        } else if (selectedUser) {
          const allUsers = StorageManager.getUsers();
          const userIndex = allUsers.findIndex(u => u.id === selectedUser.id);
          if (userIndex !== -1) {
            allUsers[userIndex].avatar = event.target.result;
            StorageManager.setUsers(allUsers);
            setSelectedUser(allUsers[userIndex]);
            loadUsers();
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-yellow-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 retro-border">
        <div className="flex justify-between items-center">
          <div className="pixel-text text-white">
            <div className="text-sm">🔑 {user.username} (ADMIN)</div>
            <div className="text-xs">Panel de Administrador</div>
          </div>
          <button
            onClick={onLogout}
            className="retro-button text-xs"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-yellow-200 border-b-4 border-yellow-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-shrink-0 p-2 text-xs pixel-text ${activeTab === 'users' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          👥 Usuarios
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-shrink-0 p-2 text-xs pixel-text ${activeTab === 'catalog' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          📦 Catálogo
        </button>
        <button
          onClick={() => setActiveTab('economy')}
          className={`flex-shrink-0 p-2 text-xs pixel-text ${activeTab === 'economy' ? 'bg-yellow-300 border-b-4 border-yellow-800' : ''}`}
        >
          💰 Economía
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">👥 Gestión de Usuarios</h2>
            {/* Create User */}
            <div className="retro-border p-4 bg-white">
              <h3 className="text-xs pixel-text font-bold mb-3">Crear Nuevo Usuario</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Usuario"
                  className="w-full p-2 border-2 border-yellow-800 text-xs"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full p-2 border-2 border-yellow-800 text-xs"
                />
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 border-2 border-yellow-800 text-xs"
                >
                  <option value={ROLES.STUDENT}>Estudiante</option>
                  <option value={ROLES.TEACHER}>Profesor</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="w-full text-xs"
                />
                <button
                  onClick={createUser}
                  className="w-full retro-button"
                >
                  ➕ Crear Usuario
                </button>
              </div>
            </div>

            {/* Users List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(u => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`retro-border p-3 text-left ${selectedUser?.id === u.id ? 'bg-yellow-300' : 'bg-white'}`}
                >
                  <div className="text-2xl mb-2">{u.avatar}</div>
                  <div className="text-xs pixel-text">{u.username}</div>
                  <div className="text-xs pixel-text text-gray-700">{u.role === ROLES.ADMIN ? '🔑 Admin' : u.role === ROLES.TEACHER ? '👨‍🏫 Profesor' : '📚 Estudiante'}</div>
                  <div className="text-xs pixel-text text-gray-700">Nivel {u.level}</div>
                </button>
              ))}
            </div>

            {/* Selected User Details */}
            {selectedUser && selectedUser.id !== user.id && (
              <div className="retro-border p-4 bg-white">
                <h3 className="text-xs pixel-text font-bold mb-3">Detalles: {selectedUser.username}</h3>
                <p className="text-xs pixel-text mb-2">Nivel: {selectedUser.level} | AMZ V: {selectedUser.amzv}</p>
                <button
                  onClick={() => deleteUser(selectedUser.id)}
                  className="retro-button bg-red-600 text-xs"
                >
                  🗑️ Eliminar Usuario
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">📦 Catálogo de Objetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalog.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`retro-border p-3 text-left ${selectedItem?.id === item.id ? 'bg-yellow-300' : 'bg-white'}`}
                >
                  <div className="text-2xl mb-2">{typeof item.image === 'string' && item.image.length > 10 ? '🖼️' : item.image}</div>
                  <div className="text-xs pixel-text font-bold">{item.name}</div>
                  <div className="text-xs pixel-text text-gray-700">{item.price} AMZ V</div>
                  <div className="text-xs pixel-text text-gray-700">{item.type}</div>
                </button>
              ))}
            </div>

            {/* Edit Item */}
            {selectedItem && (
              <div className="retro-border p-4 bg-white">
                <h3 className="text-xs pixel-text font-bold mb-3">Editar: {selectedItem.name}</h3>
                <div className="space-y-3">
                  {typeof selectedItem.image === 'string' && selectedItem.image.length > 10 ? (
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-24 h-24 object-cover" />
                  ) : (
                    <div className="text-6xl">{selectedItem.image}</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="w-full text-xs"
                  />
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Nombre"
                    defaultValue={selectedItem.name}
                    onFocus={(e) => !itemName && setItemName(selectedItem.name)}
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  />
                  <textarea
                    value={itemDesc}
                    onChange={(e) => setItemDesc(e.target.value)}
                    placeholder="Descripción"
                    defaultValue={selectedItem.description}
                    onFocus={(e) => !itemDesc && setItemDesc(selectedItem.description)}
                    className="w-full p-2 border-2 border-yellow-800 text-xs h-16"
                  />
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    placeholder="Precio"
                    defaultValue={selectedItem.price}
                    onFocus={(e) => !itemPrice && setItemPrice(selectedItem.price)}
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  />
                  <select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    defaultValue={selectedItem.type}
                    onFocus={(e) => !itemType && setItemType(selectedItem.type)}
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  >
                    <option value="consumable">Consumible</option>
                    <option value="reusable">Reutilizable</option>
                    <option value="non-usable">No Utilizable</option>
                  </select>
                  <button
                    onClick={updateItem}
                    className="w-full retro-button bg-blue-600"
                  >
                    💾 Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'economy' && (
          <div className="space-y-4">
            <h2 className="text-sm pixel-text mb-4">💰 Gestión Económica</h2>
            <p className="text-xs pixel-text">Selecciona un estudiante de la lista de usuarios para modificar su AMZ V</p>
            {selectedUser && selectedUser.role === ROLES.STUDENT && (
              <div className="retro-border p-4 bg-white">
                <h3 className="text-xs pixel-text font-bold mb-3">{selectedUser.username} - AMZ V Actual: {selectedUser.amzv}</h3>
                <div className="space-y-3">
                  <select
                    value={amzvOperation}
                    onChange={(e) => setAmzvOperation(e.target.value)}
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  >
                    <option value="add">Agregar AMZ V</option>
                    <option value="subtract">Restar AMZ V</option>
                  </select>
                  <input
                    type="number"
                    value={amzvAmount}
                    onChange={(e) => setAmzvAmount(e.target.value)}
                    placeholder="Cantidad"
                    className="w-full p-2 border-2 border-yellow-800 text-xs"
                  />
                  <button
                    onClick={updateUserAmzv}
                    className="w-full retro-button bg-green-600"
                  >
                    ✓ Aplicar Cambio
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== COMPONENTE PRINCIPAL ====================

function App() {
  const [currentUser, setCurrentUser] = useState(StorageManager.getCurrentUser());
  const [users, setUsers] = useState(StorageManager.getUsers());

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    StorageManager.setCurrentUser(null);
    setCurrentUser(null);
  };

  const handleUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    const allUsers = StorageManager.getUsers();
    const index = allUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      StorageManager.setUsers(allUsers);
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === ROLES.ADMIN) {
    return <AdminPanel user={currentUser} onLogout={handleLogout} onUpdate={handleUpdate} />;
  }

  if (currentUser.role === ROLES.TEACHER) {
    return <TeacherPanel user={currentUser} onLogout={handleLogout} onUpdate={handleUpdate} />;
  }

  return <StudentPanel user={currentUser} onLogout={handleLogout} onUpdate={handleUpdate} />;
}

ReactDOM.render(<App />, document.getElementById('root'));