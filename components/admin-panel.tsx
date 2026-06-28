"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, X, Plus, Edit, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { checkAdminAccess } from "@/lib/admin-auth"
import {
  adminProjectsAPI,
  adminSkillsAPI,
  adminInternshipsAPI,
  adminEducationAPI,
  adminMediaAPI,
  adminSettingsAPI,
  adminFileAPI,
  type AdminProject,
  type AdminSkill,
  type AdminInternship,
  type AdminEducation,
  type AdminMedia,
  type SiteSettings,
} from "@/lib/admin-api"

export function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Data states
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [skills, setSkills] = useState<AdminSkill[]>([])
  const [internships, setInternships] = useState<AdminInternship[]>([])
  const [education, setEducation] = useState<AdminEducation[]>([])
  const [media, setMedia] = useState<AdminMedia[]>([])
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  // Form states
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null)
  const [editingSkill, setEditingSkill] = useState<AdminSkill | null>(null)
  const [editingInternship, setEditingInternship] = useState<AdminInternship | null>(null)
  const [editingEducation, setEditingEducation] = useState<AdminEducation | null>(null)
  const [editingMedia, setEditingMedia] = useState<AdminMedia | null>(null)

  // Check admin access on mount
  useEffect(() => {
    checkAdminAccess().then((session) => {
      setIsAdmin(session.isAdmin)
      setIsLoading(false)
      if (session.isAdmin) {
        loadAllData()
      }
    })
  }, [])

  const loadAllData = async () => {
    try {
      const [projectsData, skillsData, internshipsData, educationData, mediaData, settingsData] = await Promise.all([
        adminProjectsAPI.getAll(),
        adminSkillsAPI.getAll(),
        adminInternshipsAPI.getAll(),
        adminEducationAPI.getAll(),
        adminMediaAPI.getAll(),
        adminSettingsAPI.get(),
      ])

      setProjects(projectsData)
      setSkills(skillsData)
      setInternships(internshipsData)
      setEducation(educationData)
      setMedia(mediaData)
      setSettings(settingsData)
    } catch (error) {
      console.error("Failed to load admin data:", error)
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      })
    }
  }

  // Project handlers
  const handleSaveProject = async (project: AdminProject) => {
    try {
      if (project.id) {
        const updated = await adminProjectsAPI.update(project.id, project)
        setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)))
      } else {
        const created = await adminProjectsAPI.create(project)
        setProjects((prev) => [...prev, created])
      }
      setEditingProject(null)
      toast({
        title: "Success",
        description: "Project saved successfully",
      })
    } catch (error) {
      console.error("Failed to save project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await adminProjectsAPI.delete(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete project:", error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  // Skill handlers
  const handleSaveSkill = async (skill: AdminSkill) => {
    try {
      if (skill.id) {
        const updated = await adminSkillsAPI.update(skill.id, skill)
        setSkills((prev) => prev.map((s) => (s.id === skill.id ? updated : s)))
      } else {
        const created = await adminSkillsAPI.create(skill)
        setSkills((prev) => [...prev, created])
      }
      setEditingSkill(null)
      toast({
        title: "Success",
        description: "Skill saved successfully",
      })
    } catch (error) {
      console.error("Failed to save skill:", error)
      toast({
        title: "Error",
        description: "Failed to save skill",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      await adminSkillsAPI.delete(id)
      setSkills((prev) => prev.filter((s) => s.id !== id))
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete skill:", error)
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      })
    }
  }

  // Settings handlers
  const handleSaveSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const updated = await adminSettingsAPI.update(newSettings)
      setSettings(updated)
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    }
  }

  // File upload handler
  const handleFileUpload = async (file: File): Promise<string> => {
    try {
      const url = await adminFileAPI.uploadFile(file)
      return url
    } catch (error) {
      console.error("Failed to upload file:", error)
      throw error
    }
  }

  if (isLoading) {
    return null
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      {/* Floating Admin Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <Tabs defaultValue="projects" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="internships">Internships</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  {/* Projects Tab */}
                  <TabsContent value="projects" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Manage Projects</h3>
                      <Button
                        onClick={() =>
                          setEditingProject({
                            title: "",
                            description: "",
                            technologies: [],
                            featured: false,
                            order: projects.length,
                            status: "active",
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      {projects.map((project) => (
                        <Card key={project.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{project.title}</CardTitle>
                              <div className="flex items-center gap-2">
                                {project.featured && <Badge>Featured</Badge>}
                                <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id!)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Skills Tab */}
                  <TabsContent value="skills" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Manage Skills</h3>
                      <Button
                        onClick={() =>
                          setEditingSkill({
                            name: "",
                            level: 50,
                            category: "Technical",
                            order: skills.length,
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      {skills.map((skill) => (
                        <Card key={skill.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{skill.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {skill.category} - {skill.level}%
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingSkill(skill)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteSkill(skill.id!)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="space-y-4">
                    <h3 className="text-lg font-semibold">Site Settings</h3>
                    {settings && (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <Label htmlFor="profileImage">Profile Image URL</Label>
                              <Input
                                id="profileImage"
                                value={settings.profileImage}
                                onChange={(e) =>
                                  setSettings((prev) => (prev ? { ...prev, profileImage: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="aboutContent">About Content</Label>
                              <Textarea
                                id="aboutContent"
                                value={settings.aboutContent}
                                onChange={(e) =>
                                  setSettings((prev) => (prev ? { ...prev, aboutContent: e.target.value } : null))
                                }
                                rows={4}
                              />
                            </div>
                            <div>
                              <Label htmlFor="heroTitle">Hero Title</Label>
                              <Input
                                id="heroTitle"
                                value={settings.heroTitle}
                                onChange={(e) =>
                                  setSettings((prev) => (prev ? { ...prev, heroTitle: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                              <Input
                                id="heroSubtitle"
                                value={settings.heroSubtitle}
                                onChange={(e) =>
                                  setSettings((prev) => (prev ? { ...prev, heroSubtitle: e.target.value } : null))
                                }
                              />
                            </div>
                            <Button onClick={() => handleSaveSettings(settings)}>
                              <Save className="h-4 w-4 mr-2" />
                              Save Settings
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>

                  {/* Other tabs would be similar... */}
                  <TabsContent value="internships">
                    <p>Internships management coming soon...</p>
                  </TabsContent>
                  <TabsContent value="education">
                    <p>Education management coming soon...</p>
                  </TabsContent>
                  <TabsContent value="media">
                    <p>Media management coming soon...</p>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Project Dialog */}
      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProject.id ? "Edit Project" : "Add Project"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          }
                        : null,
                    )
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={editingProject.featured}
                  onCheckedChange={(checked) =>
                    setEditingProject((prev) => (prev ? { ...prev, featured: checked } : null))
                  }
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveProject(editingProject)}>Save Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Skill Dialog */}
      {editingSkill && (
        <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill.id ? "Edit Skill" : "Add Skill"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                />
              </div>
              <div>
                <Label htmlFor="skillLevel">Level (%)</Label>
                <Input
                  id="skillLevel"
                  type="number"
                  min="0"
                  max="100"
                  value={editingSkill.level}
                  onChange={(e) =>
                    setEditingSkill((prev) => (prev ? { ...prev, level: Number.parseInt(e.target.value) || 0 } : null))
                  }
                />
              </div>
              <div>
                <Label htmlFor="skillCategory">Category</Label>
                <Select
                  value={editingSkill.category}
                  onValueChange={(value) => setEditingSkill((prev) => (prev ? { ...prev, category: value } : null))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveSkill(editingSkill)}>Save Skill</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
