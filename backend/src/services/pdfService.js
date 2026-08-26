import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateProjectPDF = (project) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `project-${project._id}-${Date.now()}.pdf`;
      const filepath = path.join(__dirname, '../../uploads', filename);

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.dirname(filepath);
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(24).font('Helvetica-Bold').text('Project Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(project.title, { align: 'center' });
      doc.fontSize(12).text(project.tagline, { align: 'center', color: '#666' });
      doc.moveDown();
      doc.strokeColor('#0066cc').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown();

      // Overview Section
      doc.fontSize(14).font('Helvetica-Bold').text('Overview');
      doc.fontSize(11).font('Helvetica');
      doc.text(`Difficulty Level: ${project.difficultyLevel}`, { indent: 20 });
      doc.text(`Estimated Duration: ${project.estimatedDuration}`, { indent: 20 });
      doc.text(`Team Size: ${project.teamSize} members`, { indent: 20 });
      doc.moveDown();

      // Problem Statement
      doc.fontSize(14).font('Helvetica-Bold').text('Problem Statement');
      doc.fontSize(11).font('Helvetica').text(project.problemStatement, { align: 'justify' });
      doc.moveDown();

      // Description
      doc.fontSize(14).font('Helvetica-Bold').text('Project Description');
      doc.fontSize(11).font('Helvetica').text(project.description, { align: 'justify' });
      doc.moveDown();

      // Key Features
      doc.fontSize(14).font('Helvetica-Bold').text('Key Features');
      project.keyFeatures.forEach((feature) => {
        doc.fontSize(11).font('Helvetica').text(`• ${feature}`, { indent: 20 });
      });
      doc.moveDown();

      // AI Features
      if (project.aiFeatures && project.aiFeatures.length > 0) {
        doc.fontSize(14).font('Helvetica-Bold').text('AI Components');
        project.aiFeatures.forEach((feature) => {
          doc.fontSize(11).font('Helvetica').text(`• ${feature}`, { indent: 20 });
        });
        doc.moveDown();
      }

      // Technology Stack
      doc.fontSize(14).font('Helvetica-Bold').text('Technology Stack');
      doc.fontSize(11).font('Helvetica').text(`Frontend: ${project.techStack.frontend.join(', ')}`, { indent: 20 });
      doc.text(`Backend: ${project.techStack.backend.join(', ')}`, { indent: 20 });
      doc.text(`Database: ${project.techStack.database.join(', ')}`, { indent: 20 });
      doc.text(`APIs: ${project.techStack.apis.join(', ')}`, { indent: 20 });
      doc.moveDown();

      // Architecture
      doc.fontSize(14).font('Helvetica-Bold').text('System Architecture');
      doc.fontSize(11).font('Helvetica').text(project.architecture, { align: 'justify' });
      doc.moveDown();

      // Database Design
      doc.fontSize(14).font('Helvetica-Bold').text('Database Design');
      doc.fontSize(11).font('Helvetica').text(project.databaseDesign, { align: 'justify' });
      doc.moveDown();

      // Development Roadmap
      doc.fontSize(14).font('Helvetica-Bold').text('Development Roadmap');
      project.developmentRoadmap.forEach((phase) => {
        doc.fontSize(11).font('Helvetica-Bold').text(phase.phase, { indent: 20 });
        phase.tasks.forEach((task) => {
          doc.fontSize(10).font('Helvetica').text(`- ${task}`, { indent: 40 });
        });
        doc.fontSize(10).font('Helvetica').text(`Duration: ${phase.duration}`, { indent: 40, color: '#0066cc' });
      });
      doc.moveDown();

      // Future Enhancements
      doc.fontSize(14).font('Helvetica-Bold').text('Future Enhancements');
      project.futureEnhancements.forEach((enhancement) => {
        doc.fontSize(11).font('Helvetica').text(`• ${enhancement}`, { indent: 20 });
      });
      doc.moveDown();

      // Expected Learning
      doc.fontSize(14).font('Helvetica-Bold').text('Expected Learning Outcomes');
      project.expectedLearning.forEach((learning) => {
        doc.fontSize(11).font('Helvetica').text(`• ${learning}`, { indent: 20 });
      });
      doc.moveDown();

      // Footer
      doc.fontSize(9).text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, { align: 'center', color: '#999' });
      doc.text('ProjectGen AI - AI Project Idea Generator for Students', { align: 'center', color: '#999' });

      doc.end();

      stream.on('finish', () => {
        resolve(filepath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadProjectPDF = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
