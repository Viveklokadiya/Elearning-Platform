import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { HiPlay, HiPlus, HiX, HiTrash, HiUpload, HiCheckCircle, HiArrowLeft } from "react-icons/hi";
import { validateFile, formatFileSize } from "../../utils/fileUtils";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  // Check access
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file
    const errors = validateFile(file, 'video', 100); // 100MB limit for videos
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  async function fetchProgress() {
    try {
      const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300 mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          
          {/* Progress Bar */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
              <div className="text-sm text-gray-600 mt-2 md:mt-0">
                {completedLec} of {lectLength} lectures completed
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completed}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-purple-600">{completed}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              {lecLoading ? (
                <div className="flex items-center justify-center h-96">
                  <Loading />
                </div>
              ) : lecture.video ? (
                <div>
                  <div className="relative bg-black">                    <video
                      src={lecture.video}
                      className="w-full h-96 object-contain"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                      onEnded={() => addProgress(lecture._id)}
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{lecture.title}</h1>
                    <p className="text-gray-600 leading-relaxed">{lecture.description}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <HiPlay className="w-16 h-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Lecture</h2>
                  <p className="text-gray-600">Choose a lecture from the sidebar to start learning</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Admin Controls */}
              {user && user.role === "admin" && (
                <div className="card p-6">
                  <button
                    onClick={() => setShow(!show)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      show 
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'btn-primary'
                    }`}
                  >
                    {show ? <HiX className="w-5 h-5" /> : <HiPlus className="w-5 h-5" />}
                    <span>{show ? "Cancel" : "Add Lecture"}</span>
                  </button>

                  {/* Add Lecture Form */}
                  {show && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Lecture</h3>
                      <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter lecture title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter lecture description"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={changeVideoHandler}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        {videoPrev && (
                          <video src={videoPrev} controls className="w-full rounded-lg" />
                        )}
                        <button
                          disabled={btnLoading}
                          type="submit"
                          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          {btnLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <HiUpload className="w-5 h-5" />
                              <span>Add Lecture</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Lectures List */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Lectures</h3>
                {lectures && lectures.length > 0 ? (
                  <div className="space-y-3">
                    {lectures.map((lec, i) => (
                      <div key={i} className="space-y-2">
                        <button
                          onClick={() => fetchLecture(lec._id)}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                            lecture._id === lec._id
                              ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                  {i + 1}
                                </span>
                                <div>
                                  <h4 className="font-medium text-gray-900">{lec.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{lec.description}</p>
                                </div>
                              </div>
                            </div>
                            {progress[0] && progress[0].completedLectures.includes(lec._id) && (
                              <HiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
                            )}
                          </div>
                        </button>
                        
                        {user && user.role === "admin" && (
                          <button
                            onClick={() => deleteHandler(lec._id)}
                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                          >
                            <HiTrash className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HiPlay className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No lectures available yet</p>
                    {user && user.role === "admin" && (
                      <p className="text-sm text-gray-500 mt-2">Add your first lecture to get started</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
