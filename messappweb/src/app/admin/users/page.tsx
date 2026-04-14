"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { getAllUsers, toggleUserStatus } from "@/data/user";
import { registerUser } from "@/data/auth";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { validateEmail, validatePassword, validateRequired, validatePhone } from "@/utils/validation";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/SkeletonLoader";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", password: "", roleId: 2 });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleUserStatus(id, !currentStatus);
      toast.success(`User marked as ${!currentStatus ? 'Active' : 'Inactive'}`);
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !currentStatus } : u));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateRequired(formData.name, "Name"),
      email: validateEmail(formData.email),
      phoneNumber: validatePhone(formData.phoneNumber),
      password: validatePassword(formData.password)
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(err => err !== null)) return;
    
    setIsSubmitting(true);
    try {
      await registerUser(formData);
      toast.success("User registered successfully");
      setIsModalOpen(false);
      fetchUsers();
      setFormData({ name: "", email: "", phoneNumber: "", password: "", roleId: 2 });
    } catch (error: any) {
      toast.error(error.message || "Failed to register user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name", cell: (item: any) => <span className="font-bold">{item.name}</span> },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phoneNumber" },
    { 
      header: "Status", 
      accessorKey: "isActive", 
      cell: (item: any) => (
        <StatusBadge 
          status={item.isActive ? "ACTIVE" : "INACTIVE"} 
          type={item.isActive ? "success" : "neutral"} 
        />
      ) 
    },
    { 
      header: "Role", 
      accessorKey: "roleId", 
      cell: (item: any) => (
        <span className="font-heading font-bold text-xs uppercase px-2 py-1 bg-gray-200 text-black border-2 border-border-color">
          {item.roleId === 1 ? "Admin" : "User"}
        </span>
      ) 
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleToggleStatus(item.id, item.isActive)}
            className="p-1 px-2 border-2 text-black border-border-color bg-brutal-yellow hover:bg-white transition-colors text-xs font-bold uppercase rounded-sm"
          >
            Toggle
          </button>
          <button className="p-1 border-2 border-border-color text-black bg-white hover:bg-gray-100 transition-colors rounded-sm">
            <FiEdit2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[4px] border-border-color pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase">User Management</h1>
          <p className="font-bold text-gray-600 mt-1">Add, edit, or deactivate users in the system.</p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
          <FiPlus className="stroke-[3]" /> Add New User
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : (
        <DataTable data={users} columns={columns} keyExtractor={(item) => item.id} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New User">
        <form onSubmit={handleSaveUser} className="space-y-4">
          <Input 
            label="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
            placeholder="John Doe"
          />
          <Input 
            label="Email Address" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            placeholder="user@example.com"
          />
          <Input 
            label="Phone Number" 
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            error={errors.phoneNumber}
            placeholder="1234567890"
          />
          <Input 
            label="Temporary Password" 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
            placeholder="••••••••"
          />
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="font-heading font-bold text-sm tracking-wide uppercase">Role</label>
            <select 
              className="brutal-input appearance-none"
              value={formData.roleId}
              onChange={(e) => setFormData({...formData, roleId: parseInt(e.target.value)})}
            >
              <option value={2}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>
          
          <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>Save User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
