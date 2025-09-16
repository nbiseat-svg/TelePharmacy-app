import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ConsultationService from '../services/consultationService';
import './ConsultationRoom.css';

const ConsultationRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [consultationStatus, setConsultationStatus] = useState('connecting');
  const [consultationData, setConsultationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Mock consultation data - in a real app, this would come from an API
  const mockConsultationData = {
    id: id,
    patient: {
      name: 'John Doe',
      avatar: '/src/assets/patient-avatar.jpg'
    },
    pharmacist: {
      name: 'Dr. Sarah Williams',
      avatar: '/src/assets/pharmacist-avatar.jpg',
      specialization: 'Clinical Pharmacy'
    },
    type: 'video',
    scheduledAt: '2025-09-20T10:00:00Z',
    duration: 30
  };

  // Mock messages - in a real app, this would come from WebSocket
  const mockMessages = [
    {
      id: 1,
      sender: 'pharmacist',
      text: 'Hello John, I see you requested a consultation. How can I help you today?',
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Hi Dr. Williams, I\'ve been experiencing some side effects from my new medication.',
      timestamp: '10:01 AM'
    },
    {
      id: 3,
      sender: 'pharmacist',
      text: 'I understand. Can you tell me more about the side effects you\'re experiencing?',
      timestamp: '10:02 AM'
    }
  ];

  useEffect(() => {
    const fetchConsultationData = async () => {
      try {
        // In a real app, this would fetch from API
        // const data = await ConsultationService.getConsultationById(id);
        // setConsultationData(data);
        
        // Simulate API call
        setTimeout(() => {
          setConsultationData(mockConsultationData);
          setMessages(mockMessages);
          setConsultationStatus('active');
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConsultationData();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate pharmacist response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'pharmacist',
        text: 'Thank you for sharing that. Based on what you\'ve described, I recommend adjusting your dosage.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive);
  };

  const toggleAudio = () => {
    setIsAudioActive(!isAudioActive);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const endConsultation = async () => {
    try {
      // In a real app, this would update the consultation status
      // await ConsultationService.updateConsultationStatus(id, 'completed');
      
      alert('Consultation ended successfully');
      navigate('/consultation/book');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="consultation-room-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading consultation room...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="consultation-room-page">
        <div className="error-container">
          <p>Error: {error}</p>
          <button className="btn-primary" onClick={() => navigate('/consultation/book')}>
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  if (!consultationData) {
    return (
      <div className="consultation-room-page">
        <div className="error-container">
          <p>Consultation not found</p>
          <button className="btn-primary" onClick={() => navigate('/consultation/book')}>
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="consultation-room-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="consultation-room-container">
        <div className="consultation-header">
          <div className="consultation-info">
            <h2>Consultation with {consultationData.pharmacist.name}</h2>
            <p>{consultationData.pharmacist.specialization}</p>
          </div>
          <div className="consultation-status">
            <span className={`status ${consultationStatus}`}>
              {ConsultationService.getStatusDisplayText(consultationStatus)}
            </span>
          </div>
        </div>

        <div className="consultation-content">
          <div className="video-section">
            <div className="video-container">
              {consultationStatus === 'connecting' ? (
                <div className="connecting">
                  <p>Connecting to {consultationData.pharmacist.name}...</p>
                  <div className="spinner"></div>
                </div>
              ) : (
                <>
                  <div className="remote-video">
                    <img src={consultationData.pharmacist.avatar} alt="Pharmacist" />
                    <div className="participant-name">{consultationData.pharmacist.name}</div>
                  </div>
                  <div className="local-video">
                    <img src={consultationData.patient.avatar} alt="You" />
                    <div className="participant-name">You</div>
                  </div>
                </>
              )}
            </div>

            <div className="video-controls">
              <button 
                className={`control-button ${isAudioActive ? 'active' : ''}`}
                onClick={toggleAudio}
                title={isAudioActive ? 'Mute' : 'Unmute'}
              >
                {isAudioActive ? '🔊' : '🔇'}
              </button>
              
              <button 
                className={`control-button ${isVideoActive ? 'active' : ''}`}
                onClick={toggleVideo}
                title={isVideoActive ? 'Turn off video' : 'Turn on video'}
              >
                {isVideoActive ? '📷' : '🚫'}
              </button>
              
              <button 
                className={`control-button ${isScreenSharing ? 'active' : ''}`}
                onClick={toggleScreenShare}
                title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
              >
                {isScreenSharing ? '🖥️' : '💻'}
              </button>
              
              <button 
                className="control-button end-call"
                onClick={endConsultation}
                title="End consultation"
              >
                📞
              </button>
            </div>
          </div>

          <div className="chat-section">
            <div className="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender}`}
                >
                  <div className="message-avatar">
                    <img 
                      src={message.sender === 'patient' ? consultationData.patient.avatar : consultationData.pharmacist.avatar} 
                      alt={message.sender} 
                    />
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.timestamp}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit" className="send-button">Send</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultationRoom;