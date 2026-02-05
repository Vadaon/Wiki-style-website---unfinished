<template>
  <div class="event-list">
    <div 
      class="event-item" 
      v-for="(event, index) in eventsWithTime" 
      :key="index"
      @mouseenter="hoveredEvent = index"
      @mouseleave="hoveredEvent = null"
    >
      <div class="event-decoration"></div>
      <div class="event-content">
        <p v-if="event.status === 'upcoming'">Start: {{ event.startDateFormatted }}</p>
        <p v-else>{{ hoveredEvent === index ? event.fullTimeLeft : event.shortTimeLeft }}</p>
        <h3>{{ event.truncatedTitle }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoveredEvent: null,
      currentTime: new Date(),
      events: [],
      timer: null,
    };
  },
  computed: {
    eventsWithTime() {
      return this.events.map(event => {
        const now = this.currentTime;
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const startDiff = startDate - now;
        const endDiff = endDate - now;

        let status = "active";
        let shortTimeLeft = "";
        let fullTimeLeft = "";

        if (endDiff <= 0) {
          status = "ended";
          shortTimeLeft = "Ended";
          fullTimeLeft = "Ended";
        } else if (startDiff > 0) {
          status = "upcoming";
          shortTimeLeft = `Start za ${Math.ceil(startDiff / 86400000)}d`;
          fullTimeLeft = `Startuje za ${Math.floor(startDiff / 86400000)}d ${Math.floor((startDiff % 86400000) / 3600000)}h`;
        } else {
          const days = Math.floor(endDiff / 86400000);
          const hours = Math.floor((endDiff % 86400000) / 3600000);
          const minutes = Math.floor((endDiff % 3600000) / 60000);
          const seconds = Math.floor((endDiff % 60000) / 1000);

          const formattedHours = String(hours).padStart(2, '0');
          const formattedMinutes = String(minutes).padStart(2, '0');
          const formattedSeconds = String(seconds).padStart(2, '0');

          shortTimeLeft = `${days}d`;
          fullTimeLeft = `${days}d ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }

        const truncatedTitle = event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title;

        return {
          ...event,
          status,
          shortTimeLeft,
          fullTimeLeft,
          startDateFormatted: startDate.toLocaleDateString(navigator.language, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          truncatedTitle,
        };
      });
    },
  },
  async mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    try {
      const response = await fetch('https://vishuro.b-cdn.net/api/events.json');
      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }
      const events = await response.json();

      this.events = events.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
      }));
    } catch (error) {
      console.error('Błąd ładowania eventów:', error);
    }
  },
};
</script>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 300px;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0px;
}

.event-item {
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4c1b53ad, #892d8ba1, #4c1b53a2); 
  background-size: cover;
  background-position: center;
}

.event-item:hover .event-content p {
  color: #ffffff;
}

.event-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0));
  z-index: 0;
  pointer-events: none;
}

.event-decoration {
  width: 8px;
  height: 100%;
  background: linear-gradient(to bottom, #ffcc00, #ff6600);
  position: relative;
  z-index: 2;
}

.event-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-item h3 {
  font-size: 18px;
}

.event-item p {
  font-size: 16px;
}
</style>
