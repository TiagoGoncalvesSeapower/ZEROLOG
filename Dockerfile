# Use a lightweight nginx image
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy project files into nginx web root
COPY . /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for hosting
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]