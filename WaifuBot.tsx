import React, { useState, useEffect } from 'react';
import './WaifuBot.css';

// Tipos
interface Waifu {
  id: string;
  url: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  affection: number;
}

interface UserProfile {
  username: string;
  email: string;
  password: string;
  xp: number;
  level: number;
  marriedWaifus: Waifu[];
  dailyPoints: number;
  lastDailyClaim: number | null;
  balance: number;
  achievements: {id: string, name: string, description: string, unlocked: boolean}[];
  isBanned?: boolean;
  isAdmin?: boolean;
}

// Componente principal
const WaifuBot: React.FC = () => {
  // Estados
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'gacha' | 'profile' | 'waifus' | 'admin'>('gacha');
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [waifu, setWaifu] = useState<Waifu | null>(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Constantes
  const RARITIES = [
    { type: 'common', chance: 0.7, multiplier: 1 },
    { type: 'rare', chance: 0.2, multiplier: 2 },
    { type: 'epic', chance: 0.08, multiplier: 4 },
    { type: 'legendary', chance: 0.02, multiplier: 10 }
  ];

  // Efeitos
  useEffect(() => {
    const savedUser = localStorage.getItem('waifuBotUser');
    const savedUsers = localStorage.getItem('waifuBotUsers');
    if (savedUser) {
      setUserProfile(JSON.parse(savedUser));
    }
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('waifuBotUser', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('waifuBotUsers', JSON.stringify(users));
    }
  }, [users]);

  // Limpar mensagem após 3 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Funções
  const login = () => {
    // Input validation with proper error messages
    if (!username.trim()) {
      setMessage({text: 'O nome de usuário é obrigatório.', type: 'error'});
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({text: 'Por favor, insira um email válido.', type: 'error'});
      return;
    }
    if (!password.trim() || password.length < 6) {
      setMessage({text: 'A senha deve ter pelo menos 6 caracteres.', type: 'error'});
      return;
    }

    // Verificar se usuário ou email já existe
    const existingUserByName = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    const existingUserByEmail = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // Caso de login
    if (existingUserByName || existingUserByEmail) {
      const matchingUser = existingUserByName || existingUserByEmail;

      // Verificar se usuário está banido
      if (matchingUser.isBanned) {
        setMessage({text: 'Este usuário está banido.', type: 'error'});
        return;
      }

      // Verificar se as credenciais correspondem
      if (matchingUser.username.toLowerCase() !== username.toLowerCase() || 
          matchingUser.email.toLowerCase() !== email.toLowerCase() || 
          matchingUser.password !== password) {
        setMessage({text: 'Credenciais inválidas.', type: 'error'});
        return;
      }

      // Atualizar último acesso e salvar
      const updatedUser = {
        ...matchingUser,
        lastLogin: Date.now()
      };
      
      setUserProfile(updatedUser);
      setUsers(users.map(u => u.username === updatedUser.username ? updatedUser : u));
      setMessage({text: 'Login realizado com sucesso!', type: 'success'});
      return;
    }

    // Caso de novo registro
    // Verificar se username já existe
    if (existingUserByName) {
      setMessage({text: 'Este nome de usuário já está em uso.', type: 'error'});
      return;
    }

    // Verificar se email já existe
    if (existingUserByEmail) {
      setMessage({text: 'Este email já está registrado.', type: 'error'});
      return;
    }

    // Criar novo perfil
    const newProfile: UserProfile = {
      username,
      email,
      password,
      xp: 0,
      level: 1,
      marriedWaifus: [],
      dailyPoints: 0,
      lastDailyClaim: null,
      lastLogin: Date.now(),
      balance: 500,
      isAdmin: username.toLowerCase() === 'admin',
      achievements: [
        {id: 'first_login', name: 'Primeiro Login', description: 'Entrou pela primeira vez no WaifuBot', unlocked: true},
        {id: 'first_waifu', name: 'Primeira Waifu', description: 'Casou-se com sua primeira waifu', unlocked: false},
        {id: 'waifu_collector', name: 'Colecionador', description: 'Possui 5 waifus', unlocked: false},
        {id: 'high_roller', name: 'Ricaço', description: 'Acumulou 5000 pontos', unlocked: false}
      ]
    };
    
    setUserProfile(newProfile);
    setUsers([...users, newProfile]);
    setMessage({text: 'Cadastro realizado com sucesso!', type: 'success'});
  };

  const getRarity = () => {
    const roll = Math.random();
    let cumulativeProbability = 0;
    
    for (const rarity of RARITIES) {
      cumulativeProbability += rarity.chance;
      if (roll <= cumulativeProbability) {
        return rarity.type as Waifu['rarity'];
      }
    }
    
    return 'common' as Waifu['rarity'];
  };

  const generateWaifuName = () => {
    const firstNames = ['Miku', 'Rei', 'Asuka', 'Mai', 'Zero', 'Rem', 'Hinata', 'Sakura', 'Misato', 'Tohru'];
    const lastNames = ['Tachibana', 'Ayanami', 'Shikinami', 'Sakurajima', 'Two', 'Mizuhara', 'Hyuga', 'Haruno', 'Katsuragi', 'Kobayashi'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const extractWaifuName = (imageData: any) => {
    try {
      // First try to get the character name from tags array
      if (imageData.tags && Array.isArray(imageData.tags)) {
        // Look for character name in tag names
        const characterTag = imageData.tags.find((tag: any) => 
          typeof tag === 'object' && tag.name && typeof tag.name === 'string' && 
          (tag.name.startsWith('character_') || tag.name.includes('_name'))
        );
        
        if (characterTag) {
          const name = characterTag.name
            .replace(/^character_|_name$/g, '')
            .split('_')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          // Validate the extracted name
          if (name.length >= 2 && name.length <= 30 && /^[A-Za-z\s]+$/.test(name)) {
            return name;
          }
        }

        // Try to find name in description if available
        if (imageData.description && typeof imageData.description === 'string') {
          const nameMatch = imageData.description.match(/(?:character|name):\s*([A-Za-z\s]+)/i);
          if (nameMatch && nameMatch[1]) {
            const name = nameMatch[1].trim();
            if (name.length >= 2 && name.length <= 30 && /^[A-Za-z\s]+$/.test(name)) {
              return name;
            }
          }
        }
      }

      // If no valid character name found, use generateWaifuName for a random name
      return generateWaifuName();

    } catch (error) {
      console.error('Error extracting waifu name:', error);
      return generateWaifuName();
    }
  };

  const searchFreeWaifu = async () => {
    if (!userProfile || userProfile.isBanned) {
      setMessage({text: 'Você precisa estar logado para buscar waifus.', type: 'error'});
      return;
    }
    
    setLoading(true);
    setWaifu(null);
    
    try {
      const response = await fetch('https://api.waifu.im/search/?included_tags=waifu&is_nsfw=true');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (!data.images || data.images.length === 0) {
        throw new Error('No waifu images found');
      }

      const randomImage = data.images[Math.floor(Math.random() * data.images.length)];
      const newWaifu = {
        id: `waifu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: randomImage.url,
        name: extractWaifuName(randomImage),
        rarity: 'common',
        price: 50,
        affection: 0
      };

      setWaifu(newWaifu);
      
      // Adicionar XP pela busca e verificar level up
      const newXp = userProfile.xp + 5;
      setUserProfile(prevProfile => ({
        ...prevProfile,
        xp: newXp
      }));
      
      checkLevelUp(newXp);
      setMessage({text: 'Waifu encontrada com sucesso!', type: 'success'});
    } catch (error) {
      console.error('Erro ao buscar waifu:', error);
      setMessage({text: `Erro ao buscar waifu: ${error.message}. Tente novamente.`, type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const fetchWaifu = async () => {
    if (!userProfile || userProfile.isBanned) {
      setMessage({text: 'Você precisa estar logado para usar o gacha.', type: 'error'});
      return;
    }
    
    if (userProfile.balance < 100) {
      setMessage({text: 'Saldo insuficiente para tentar o gacha premium.', type: 'error'});
      return;
    }
    
    setLoading(true);
    setWaifu(null);
    
    try {
      // Gastar pontos primeiro
      const newBalance = userProfile.balance - 100;
      const newXp = userProfile.xp + 10;
      
      // Buscar imagem
      const response = await fetch('https://api.waifu.im/search/?included_tags=waifu&is_nsfw=true');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (!data.images || data.images.length === 0) {
        throw new Error('No waifu images found');
      }

      const rarity = getRarity();
      const rarityData = RARITIES.find(r => r.type === rarity)!;
      const price = 100 * rarityData.multiplier;
      const randomImage = data.images[Math.floor(Math.random() * data.images.length)];
      
      const newWaifu = {
        id: `waifu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: randomImage.url,
        name: extractWaifuName(randomImage),
        rarity,
        price,
        affection: 0
      };

      setWaifu(newWaifu);
      
      // Atualizar perfil do usuário
      setUserProfile(prevProfile => ({
        ...prevProfile,
        balance: newBalance,
        xp: newXp
      }));
      
      checkLevelUp(newXp);
      setMessage({text: `Você obteve uma waifu ${rarity}!`, type: 'success'});
    } catch (error) {
      console.error('Erro ao buscar waifu:', error);
      setMessage({text: `Erro ao buscar waifu: ${error.message}. Tente novamente.`, type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const checkLevelUp = (newXp: number) => {
    if (!userProfile) return;
    
    const newLevel = Math.floor(newXp / 100) + 1;
    if (newLevel > userProfile.level) {
      setUserProfile({
        ...userProfile,
        level: newLevel,
        balance: userProfile.balance + 200 // Bônus por level up
      });
      setMessage({text: `Level up! Você alcançou o nível ${newLevel}!`, type: 'success'});
    }
  };

  // Funções de administrador
  const toggleUserBan = (username: string) => {
    if (!userProfile?.isAdmin) return;

    setUsers(users.map(user => {
      if (user.username === username) {
        return { ...user, isBanned: !user.isBanned };
      }
      return user;
    }));

    setMessage({
      text: `Usuário ${username} foi ${users.find(u => u.username === username)?.isBanned ? 'desbanido' : 'banido'}.`,
      type: 'success'
    });
  };

  const setUserPoints = (username: string, points: number) => {
    if (!userProfile?.isAdmin) return;

    setUsers(users.map(user => {
      if (user.username === username) {
        return { ...user, balance: points };
      }
      return user;
    }));

    setMessage({
      text: `Pontos do usuário ${username} foram atualizados para ${points}.`,
      type: 'success'
    });
  };

  // Renderização do painel de administrador
  const renderAdminPanel = () => {
    if (!userProfile?.isAdmin) return null;

    return (
      <div className="admin-panel">
        <h2>Painel de Administrador</h2>
        <div className="users-list">
          <h3>Lista de Usuários</h3>
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Nível</th>
                <th>Pontos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.level}</td>
                  <td>
                    <input
                      type="number"
                      value={user.balance}
                      onChange={(e) => setUserPoints(user.username, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{user.isBanned ? 'Banido' : 'Ativo'}</td>
                  <td>
                    <button
                      onClick={() => toggleUserBan(user.username)}
                      className={user.isBanned ? 'unban-btn' : 'ban-btn'}
                    >
                      {user.isBanned ? 'Desbanir' : 'Banir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="waifu-bot">
      <h1>WaifuBot</h1>
      
      {!userProfile ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Entrar</button>
        </div>
      ) : (
        <div className="main-content">
          <div className="user-info">
            <p>Usuário: {userProfile.username}</p>
            <p>Nível: {userProfile.level}</p>
            <p>XP: {userProfile.xp}</p>
            <p>Saldo: {userProfile.balance} pontos</p>
          </div>
          
          <div className="tabs">
            <button
              className={activeTab === 'gacha' ? 'active' : ''}
              onClick={() => setActiveTab('gacha')}
            >
              Gacha
            </button>
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              Perfil
            </button>
            <button
              className={activeTab === 'waifus' ? 'active' : ''}
              onClick={() => setActiveTab('waifus')}
            >
              Waifus
            </button>
            {userProfile.isAdmin && (
              <button
                className={activeTab === 'admin' ? 'active' : ''}
                onClick={() => setActiveTab('admin')}
              >
                Admin
              </button>
            )}
          </div>
          
          {activeTab === 'admin' && renderAdminPanel()}
          
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default